import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Log a success message with the host and a visual cue
        console.log(chalk.green.bold(`✅ MongoDB Connected Successfully`));
        console.log(chalk.cyan(`🔗 Host: ${conn.connection.host}`));
        console.log(chalk.magenta(`📦 Database: ${conn.connection.name}`));

    } catch (error) {
        // Log a detailed error message with a clear failure indicator
        console.error(chalk.red.bold(`❌ Error connecting to MongoDB:`));
        console.error(chalk.red(`  -> Message: ${error.message}`));

        // Exit the process with a failure code
        process.exit(1);
    }
};

export default connectDB;