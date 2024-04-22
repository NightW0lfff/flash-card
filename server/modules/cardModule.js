const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Missing title for topic"],
    unique: true,
    trim: true,
  },
  card: [
    {
      question: {
        type: String,
        required: [true, "Missing question for card"],
        trim: true,
      },
      answer: {
        type: String,
        required: [true, "Missing answer for card"],
        trim: true,
      },
      count: [
        {
          _id: false,
          correct: {
            type: Number,
            default: 0,
          },
          wrong: {
            type: Number,
            default: 0,
          },
        },
      ],
      totalCount: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
