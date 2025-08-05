import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'responded';
    adminNotes?: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        minlength: [5, 'Subject must be at least 5 characters'],
        maxlength: [100, 'Subject cannot exceed 100 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['new', 'read', 'responded'],
        default: 'new',
        required: true
    },
    adminNotes: {
        type: String,
        trim: true,
        maxlength: [500, 'Admin notes cannot exceed 500 characters']
    },
    ipAddress: {
        type: String,
        trim: true
    },
    userAgent: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
ContactMessageSchema.index({ status: 1, createdAt: -1 });
ContactMessageSchema.index({ email: 1 });

// Virtual for formatted date
ContactMessageSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

export default mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
