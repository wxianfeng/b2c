#!/bin/bash

cd /usr/local/system/projects/fashionsprout/vendor/cache

echo "installing start ..."

for i in `ls`;do
	gem=`echo $i | awk -F'-' '{print $1}'`
        version=`echo $i | grep -o "\-[0-9].*" | sed 's/^-//;s/.gem//'`
	is_gem_exist=`gem list $gem -v=$version`
	if [ -z "$is_gem_exist" ]; then 
          gem install $i --no-ri --no-rdoc	  
	else
	  echo "$i have installed"
	fi
done

echo "install completed!"
