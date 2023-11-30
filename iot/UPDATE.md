# How to update a child repo from this template

run this script and remove the possibly added files 
```
git push -d fix/update-template
git branch -D fix/update-template
git checkout -b fix/update-template
git clone ssh://git@git.dzeio.com:8022/aptatio/template-2.git tpl
rm -rf tpl/.git tpl/SETUP.md tpl/UPDATE.md tpl/README.md
yes | cp tpl/{.,}* ./ -r
rm -rf tpl
git add .
git commit -m "misc: update template"
git push -u origin fix/update-template
```