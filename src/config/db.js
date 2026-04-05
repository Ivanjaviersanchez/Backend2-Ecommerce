import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está definida en .env');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('Mongo conectado');
  } catch (error) {
    console.error('Error Mongo:', error.message);
    process.exit(1);
  }
};