import React, { useState, useEffect } from 'react';
import axios from 'axios';

const express = require('express');
const router = express.Router();
const Accident = require('../models/Accident');

router.get('/accidents', async (req, res) => {
  try {
    const accidents = await Accident.find();
    res.json(accidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/accidents', async (req, res) => {
  const accident = new Accident({
    tipo: req.body.tipo,
    severidade: req.body.severidade,
    data: req.body.data,
    vitimas: req.body.vitimas,
    hora: req.body.hora
  });

  try {
    const newAccident = await accident.save();
    res.status(201).json(newAccident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/accidents/:id/response', async (req, res) => {
  try {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
      return res.status(404).json({ message: 'Acidente não encontrado' });
    }
    accident.resposta = req.body.resposta;
    const updatedAccident = await accident.save();
    res.json(updatedAccident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/accidents/:id', async (req, res) => {
  try {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
      return res.status(404).json({ message: 'Acidente não encontrado' });
    }
    await accident.remove();
    res.json({ message: 'Acidente removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
