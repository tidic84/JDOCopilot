## JDOCopilot
**JDOCopilot est une application basée sur pronote.**

Elle a pour but d’optimiser les journées dans le lycée et éviter les retards car il est facile de se tromper ou de ne tout simplement pas trouver sa salle, vu l'organisation désastreuse du lycée. 
Cette application est destinée aux nouveaux élèves comme aux habitués et aux profs responsables des AS et du journal du lycée.
Le principal objectif de l'application est d'optimiser les déplacements dans le lycée, à l'aide d'un plan plus ergonomique que ceux déjà proposés. Mais l'application intégrera un chat, avec création automatique de groupes de classe,
les horraires des AS avec comment s'y inscrire, un affichage hors ligne de l'emploi du temps, permettant de conaître sa salle de n'importe où, une page de nouvelles, permettant
aux élèves du cve, cvl, etc d'afficher des informations et une vue d'ensemble de la progression jusqu'au bac. Des 'widgets' seront aussi disponibles pour ne pas avoir a attendre pour conaître sa salle.


## table des matières :

 › [Comment ça marche](https://github.com/tidic84/JDOCopilot/tree/f-end#comment-%C3%A7a-marche) <br />
 › [C'est sécurisé ?](https://github.com/tidic84/JDOCopilot/tree/f-end#est-ce-que-cest-s%C3%A9curis%C3%A9) <br />
 › [Tout est de nous ?](https://github.com/tidic84/JDOCopilot/tree/f-end#tout-est-de-nous) <br />
 › [C'est codé comment ?](https://github.com/tidic84/JDOCopilot/tree/f-end#tout-est-de-nous) <br />
 › [Screens](https://github.com/tidic84/JDOCopilot/tree/f-end#screens-sparkles) <br />

## comment ça marche ?

le schema de pronote pour notre académie est très simple:
un client passe par atrium comme un tunnel pour accéder aux serveurs de pronote.
Notre application ajàute une étape:
notre [API](https://github.com/tidic84/JDOCopilot-api) passe par Atrium pour se connecter à pronote avec vos identifiants et renvoyer à l'application les données demandées.

![schema](https://media.discordapp.net/attachments/657940718186266645/1062467312961192076/image.png?width=1119&height=586)

## Est-ce que c'est sécurisé?

Oui ! Vos identifiants sont en sécurité avec nous, personne ne vera vos notes, même pas nous :)
Les identifiants sont tous cryptés avant d'être envoyés à pronote, en plus, nous ne gardons pour le moment aucune données personnelles : tout est téléchargé à votre première connexion journalière. La vérification de vos identifiants est faite par les serveurs de pronote, on à même pas votre prénom.

**En revenche**
Ce qui n'est ni chez pronote ni chez nous est chez vous !
Les données sur votre téléphone ne sont pas cryptées, il est donc de votre responsabilité de les protéger :)


## Tout est de nous?

Non ! Pour coder l'application nous avons utilisé une API originelle de Litarvan, qu'on a adapté à cause d'un bug sur les connexions a Atrium.
Nous avons aussi utilisé des librairies diverses et variées pour l'ergonomie, la sécurité et l'efficacité de l'application.
Donc nous remercions expressement tous ces développeurs qui mettent leurs outils gratuitement au service de leur compères ! 

› [Petit flex de la f-end team :)](https://www.npmjs.com/package/basic-pp)


## spécifications
![ReactNative](https://img.shields.io/static/v1?label=&message=React%20Native&color=grey&logo=react) ![JSON](https://img.shields.io/static/v1?label=&message=JSON&color=yellowgreen&logo=json) ![JavaScript](https://img.shields.io/static/v1?label=&message=JavaScript&color=grey&logo=javascript) ![Expo](https://img.shields.io/static/v1?label=&message=Expo%20Go&color=blue&logo=expo)

**L'application est codée en react native, utilise l'API pronote de Litarvan et Expo go**

## C'est gratuit?

Pour l'heure, JDO-Copilot est gratuit et open-source, vous pouvez y participer en faisant une pull request, avec une explication détaillée de ce qu'apporte votre contribution. Si celle-ci est acceptée, vous serez mentionné comme contributeur.

## screens :sparkles:
![Login](https://media.discordapp.net/attachments/657940718186266645/1062448523439771669/Screenshot_1673377835.png?width=285&height=586) ![edt](https://media.discordapp.net/attachments/1051199896239218849/1062445353560973312/Screenshot_1673377056.png?width=285&height=586) ![edt2](https://media.discordapp.net/attachments/1051199896239218849/1062445353875542087/Screenshot_1673377060.png?width=285&height=586) ![progression de l'année](https://media.discordapp.net/attachments/657940718186266645/1061927807099338752/Screenshot_1673199363.png?width=285&height=586) ![devoirs](https://media.discordapp.net/attachments/1051199896239218849/1062445352885686424/Screenshot_1673377018.png?width=285&height=586) ![devoirs2](https://media.discordapp.net/attachments/1051199896239218849/1062445353229635694/Screenshot_1673377038.png?width=285&height=586)


### Love, Albatross! xoxo
*Albatross! NSI cross-team*
