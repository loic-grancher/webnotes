---
title: Cheatsheet
prev: false
---
## GIT

### Initialise git project
```sh
git init
```

### Add updated files for commit
```sh
git add .
```

### Commit the pending changes
```sh
git commit -m "my message"
```

## GITHUB

### Sync to github repo
```sh
git remote add origin https://github.com/yourusername/your-repo-name.git
```

### Updating/changing the github repo
```sh
git remote set-url origin https://github.com/yourusername/your-repo-name.git
```


### Check curent Github repo
```sh
git remote -v
```

### Select branch
```sh
git branch -M main
```


### Push the commit to github
```sh
git push -u origin main
```
