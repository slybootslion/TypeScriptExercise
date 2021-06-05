echo '拉取'
git pull

echo '开始提交'
git add .
time=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "${time}"
git push
git push origin-github master
echo '结束'
