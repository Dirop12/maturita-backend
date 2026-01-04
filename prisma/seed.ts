import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Oddělení
  const dep1 = await prisma.department.create({ data: { name: 'Kardiologie' } });
  const dep2 = await prisma.department.create({ data: { name: 'Neurologie' } });

  // 2. Uživatelé (v reálu by heslo muselo být zahashované, to uděláme v dalším kroku)
  const userAdmin = await prisma.user.create({
    data: { email: 'admin@nemocnice.cz', password: 'admin', role: 'ADMIN' }
  });
  const userDoctor = await prisma.user.create({
    data: { email: 'novak@nemocnice.cz', password: 'password123', role: 'DOCTOR' }
  });
  const userPatient = await prisma.user.create({
    data: { email: 'pacient@seznam.cz', password: 'password123', role: 'PATIENT' }
  });

  // 3. Doktor
  const doctor = await prisma.doctor.create({
    data: { firstName: 'Jan', lastName: 'Novák', specialization: 'Kardiolog', userId: userDoctor.id, departmentId: dep1.id }
  });

  // 4. Pacient
  const patient = await prisma.patient.create({
    data: { firstName: 'Petr', lastName: 'Svoboda', birthDate: new Date('1990-05-15'), userId: userPatient.id }
  });

  // 5. Návštěva
  const visit = await prisma.visit.create({
    data: { report: 'Pravidelná prohlídka, srdce bije jak zvon.', patientId: patient.id, doctorId: doctor.id }
  });

  // 6. Recept
  await prisma.prescription.create({
    data: { medication: 'Aspirin 100mg', visitId: visit.id }
  });

  // 7. Novinka
  await prisma.news.create({
    data: { title: 'Nová parkovací místa', content: 'Od pondělí otevíráme nové parkoviště pro pacienty.' }
  });

  console.log('Databáze byla úspěšně naplněna daty!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());