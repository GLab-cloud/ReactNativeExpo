# ReactNativeExpo

A React Native project created with CodeSandbox. Explore modern React Native features and UI components.

## 🚀 Features

- React Native with Expo
- TypeScript support
- Modern UI Components
- Flexible Box Layout
- State Management
- ScrollView & TouchableWithoutFeedback components
- Pressable components with opacity effects
- To-Do App implementation

## 📋 Project Structure

```
app/
├── components/
├── screens/
└── utils/
```

## 🗄️ Database - MongoDB

This project uses **MongoDB** as its primary database solution.

### MongoDB Setup

#### Installation & Connection

```bash
# Install MongoDB locally (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Or use Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

#### Connection String

```javascript
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
```

#### Environment Variables

Create a `.env` file in your project root:

```env
MONGODB_URI=mongodb://localhost:27017/reactnativeexpo
MONGODB_DB_NAME=reactnativeexpo
NODE_ENV=development
```

#### Basic Connection Example

```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### MongoDB Schema Examples

#### User Schema

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
```

#### Todo Schema

```javascript
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Todo = mongoose.model('Todo', todoSchema);
```

### MongoDB Operations

#### Create
```javascript
const newUser = await User.create({
  name: 'John Doe',
  email: 'john@example.com'
});
```

#### Read
```javascript
const user = await User.findById(userId);
const allUsers = await User.find();
```

#### Update
```javascript
const updatedUser = await User.findByIdAndUpdate(
  userId,
  { name: 'Jane Doe' },
  { new: true }
);
```

#### Delete
```javascript
await User.findByIdAndDelete(userId);
```

### MongoDB Atlas (Cloud)

For cloud-hosted MongoDB:

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

## 📦 Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

## 🎮 Running the Project

```bash
# Start development server
npm start
# or
yarn start
```

## 🛠️ Technologies

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose (optional)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.
