#!/bin/bash

# 
# Creates a "stand alone" apache mod_redirect rules files, based on a CSV file with the OLD to NEW URL mappings
# The HTTP 301 redirect is dependant uppn the the 'age gate' cookie 'age_checked'. 
# If the age_checked cookiw value is
# - facebook', then age_checked cookie is invalidated, the reditect is to '/en' (global locale). This forces user to go through the agegate mechanism again.
# - <country>..., then a mod_write map file is used to determine the locale, and the redirect is done to the new URL. No age gate popup would be required.
#If the age_checked cookie is NOT set, then the global local '/en' is used, and the user is forced through the age gate mechanism.  
#
# NOTE: REMOVE THE BOM FROM THE INPUT CSV FILE.

INPUTFILE=./brancott-url-redirects.csv
OUTPUTFILE=./brancott-url-redirects.conf

#
# Quotes the special regular expression used by the  rewrite rules
# Also quotes regexp characters, where required  ". \ + * ? [ ^ ] $ ( ) { } = ! < > | : -"# 

function escape_regexp()
{
	local inStr=${1}
	local outStr=${inStr}

#        outStr=$(echo ${outStr} | sed -e 's/^\///')
        outStr=$(echo ${outStr} | sed -e 's/^/^/')
        outStr=$(echo ${outStr} | sed -e 's/$/$/')
        
	outStr=$(echo ${outStr}  | sed  -e 's/\-/\\\-/g' -e 's/\./\\\./g' -e 's/\+/\\\+/g' -e 's/\*/\\\*/g' -e 's/\?/\\\?/g')
        outStr=$(echo ${outStr} | sed -e 's/\[/\\\[/g' -e 's/\]/\\\]/g' ) #  -e 's/\(/\\\(/g' -e 's/\)/\\\)/g')
#        outStr=$(echo ${outStr} | sed  -e 's/\$/\\\$/g'  -e 's/\{/\\\{/g' -e 's/\}/\\\}/g' -e 's/\=/\\\=/g' -e 's/\!/\\\!/g' -e 's/\</\\\</g' -e 's/\>/\\\>/g' -e 's/\^/\\\^/g')
        outStr=$(echo ${outStr} | sed -e 's/\|/\\\|/g' -e 's/\:/\\\:/g')   
	echo ${outStr} 
}

# TBD, put file checks here

(
printf "#Brancott old site to new site redirects\n"
printf "<IfModule mod_rewrite.c>\n"
printf "RewriteEngine on\n"

while IFS=',' read fromURL toURL 
do
	if [ -z ${fromURL} ] || [ -z ${toURL}   ] ; then
		continue
	fi

        printf "%s\n" "#"
        printf "%s\n" "# OLDURL=${fromURL}   NEWURL=${toURL}"
        printf "%s\n" "#"

	printf "%s\n" 'RewriteCond %{HTTP_COOKIE} (^|;\ *)age_checked=([^;\ ]+)'
	printf "%s\n" 'RewriteCond "%2" "facebook'
	printf "%s\n" "RewriteRule $(escape_regexp ${fromURL}) /en${toURL}?%{QUERY_STRING}  [L,R=301,CO=age_checked:INVALID:;:-1]"

	printf "%s\n" 'RewriteCond %{HTTP_COOKIE} (^|;\ *)age_checked=([^%;\ ]+)'
	printf "%s\n" 'RewriteMap locales "txt:conf/brancott-url-redirects-map.txt"'
	printf "%s\n" "RewriteRule $(escape_regexp ${fromURL}) /\${locales:%2|en}${toURL}?%{QUERY_STRING}  [L,R=301]"

	printf "%s\n" "RewriteRule $(escape_regexp ${fromURL}) /en${toURL}?%{QUERY_STRING}  [L,R=301]"
   
done < ${INPUTFILE}
	printf "</IfModule>\n"
) > ${OUTPUTFILE}


cat ${OUTPUTFILE}
cp ${OUTPUTFILE} /Applications/DevDesktop/apache/conf
/Applications/DevDesktop/apache/bin/apachectl restart
