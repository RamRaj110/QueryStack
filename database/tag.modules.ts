import { model, models, Schema } from "mongoose";

export interface ITag {
  name: string;
  questionCount: number;
  _id?: string;
}
export interface ITagDoc extends ITag, Document {}
const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true },
    questionCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
