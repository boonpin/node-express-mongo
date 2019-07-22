import * as mongoose from 'mongoose';

export const UserCollectionName = 'users';

export interface IUser extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    type: string;
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    username: mongoose.SchemaTypes.String,
    password: mongoose.SchemaTypes.String,
    type: mongoose.SchemaTypes.String,
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

export const User = mongoose.model<IUser>('User', UserSchema, UserCollectionName);




