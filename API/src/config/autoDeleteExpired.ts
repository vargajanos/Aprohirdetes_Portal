import * as cron from 'node-cron';
import { AppDataSource } from '../config/data-source';
import { Advertisement } from '../entities/Advertisement';

const productRepository = AppDataSource.getRepository(Advertisement);

// Ütemezett feladat, ami minden nap éjfélkor fut
cron.schedule('0 0 * * *', async () => { // Minden nap éjfélkor
    console.log('Ellenőrzés: 1 percnél régebbi hirdetések törlése...');

    // Lekérdezzük a lejárt hirdetéseket
    const expiredAds = await productRepository
        .createQueryBuilder('advertisement')
        .where('advertisement.date < NOW() - INTERVAL 1 WEEK')
        .getMany();

     // Ha vannak lejárt hirdetések, töröljük őket
    if (expiredAds.length > 0) {
        await productRepository.remove(expiredAds);
        console.log(`Törölve lett ${expiredAds.length} 1 percnél régebbi hirdetés.`);
    } else {
        console.log('Nincs 1 percnél régebbi hirdetés.');
    }
});
