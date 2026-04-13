## Első lépések
1.) VS Code legyen telepítve

2.) Node.JS legyen leszedve: https://nodejs.org/en (v24.14.0 LTS)

3.) Repo leszedése (ezt VS Code->Terminal bal felül->New Terminal):
- git clone <repo_link>
- cd <repo_mappa>
- npm install

## Munkafolyamat
1.) Minden ticket kezdése előtt
- git checkout develop -> develop branch-be megyünk
- git pull -> leszedjük a legfrissebb változatot
-  git checkout -b feature/< ticket > -> új branch nyitása

1.) Munka közben commit nyugodtan mehet
 - git add . -> minden fájl hozzáadása
 - git commit -m "Short desc" -> rövid leírás

3.) Ha végeztünk akkor push
 - git push -u origin feature/< ticket >
 - PR nyitása
## Fontos szabályok
- Main-re nem pusholunk közvetlenül
- Minden Jira tickethez külön branch
- PR kötelező merge előtt
- Munkakezdés előtt mindig git pull
## Emailhez
- Pullold a lefgrissebb verziót (main és develop)
- Nyisd meg a backend mappát
- Jobb click egy üres térre -> Megnyitás a terminálban
- írd be: npm install
- Kész :)
