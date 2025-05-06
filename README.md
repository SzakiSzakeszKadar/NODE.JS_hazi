# VHS Kölcsönzõ Rendszer

Ez egy egyszerû VHS kölcsönzõ rendszer, amely lehetõvé teszi a VHS kazetták, ügyfelek és kölcsönzések kezelését.

## Funkciók

- VHS kazetták kezelése (hozzáadás, szerkesztés, törlés)
- Ügyfelek kezelése (hozzáadás, szerkesztés, törlés)
- Kölcsönzések kezelése (hozzáadás, szerkesztés, törlés)
- Kölcsönzések státuszának követése (aktív, visszahozott, lejárt)

## Telepítés

1. Klónozd le a repository-t:
```bash
git clone https://github.com/yourusername/vhs-rental.git
cd vhs-rental
```

2. Telepítsd a függõségeket:
```bash
npm install
```

3. Indítsd el a MongoDB szervert

4. Indítsd el az alkalmazást:
```bash
npm start
```

Az alkalmazás elérhetõ lesz a `http://localhost:3000` címen.

## Fejlesztõi környezet

Fejlesztõi módban indítás:
```bash
npm run dev
```

## Technológiák

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS 