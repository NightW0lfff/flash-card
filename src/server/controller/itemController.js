const Card = require("../models/cardModel");
const mongoose = require("mongoose");

exports.createItem = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({
        status: "fail",
        message: "Card not found",
      });
    }

    card.cards.push({ question: question, answer: answer });

    await card.save();

    res.status(201).json({
      status: "success",
      card,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const { question, answer } = req.body;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({
        status: "fail",
        message: "Card not found",
      });
    }

    const itemIndex = card.cards.findIndex((item) => item._id == itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found in card",
      });
    }

    card.cards[itemIndex].question = question;
    card.cards[itemIndex].answer = answer;

    await card.save();

    res.status(200).json({
      status: "success",
      card,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({
        status: "fail",
        message: "Card not found",
      });
    }

    card.cards = await card.cards.filter((item) => String(item._id) !== itemId);

    await card.save();

    res.status(200).json({
      status: "success",
      card,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
