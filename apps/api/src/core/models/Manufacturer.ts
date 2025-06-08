import mongoose, { Schema, Document, Types } from 'mongoose'

interface IContactPerson {
  name: string
  email: string
  phone: string
}

export interface IManufacturer extends Document {
  _id: Types.ObjectId
  name: string
  industry: string
  userIds: Types.ObjectId[]
  contactPerson: IContactPerson
}

const ManufacturerSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    contactPerson: { name: String, email: String, phone: String }
  },
  { timestamps: true }
)

export default mongoose.model<IManufacturer>('Manufacturer', ManufacturerSchema)
