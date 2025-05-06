# VHS K�lcs�nz� Rendszer

Ez egy egyszer� VHS k�lcs�nz� rendszer, amely lehet�v� teszi a VHS kazett�k, �gyfelek �s k�lcs�nz�sek kezel�s�t.

## Funkci�k

- VHS kazett�k kezel�se (hozz�ad�s, szerkeszt�s, t�rl�s)
- �gyfelek kezel�se (hozz�ad�s, szerkeszt�s, t�rl�s)
- K�lcs�nz�sek kezel�se (hozz�ad�s, szerkeszt�s, t�rl�s)
- K�lcs�nz�sek st�tusz�nak k�vet�se (akt�v, visszahozott, lej�rt)

## Telep�t�s

1. Kl�nozd le a repository-t:
```bash
git clone https://github.com/yourusername/vhs-rental.git
cd vhs-rental
```

2. Telep�tsd a f�gg�s�geket:
```bash
npm install
```

3. Ind�tsd el a MongoDB szervert

4. Ind�tsd el az alkalmaz�st:
```bash
npm start
```

Az alkalmaz�s el�rhet� lesz a `http://localhost:3000` c�men.

## Fejleszt�i k�rnyezet

Fejleszt�i m�dban ind�t�s:
```bash
npm run dev
```

## Technol�gi�k

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS 