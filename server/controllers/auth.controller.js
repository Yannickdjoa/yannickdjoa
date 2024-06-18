import React from 'react';

export const authController = async () => {
  const userId = await db.collection('users').doc(`${Date.now()}`);
  await userId.create({
    userId: userId.id,
    name: req.body.name,
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    location: req.body.location,
    github: req.body.github,
    avatar: req.body.avatar,
  });
};
