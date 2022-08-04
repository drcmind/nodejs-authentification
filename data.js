const bcrypt = require("bcrypt");

var defaultHashedPassword;
const utilisateurs = [];

(async () => {
  const salt = await bcrypt.genSalt(10);
  defaultHashedPassword = await bcrypt.hash("1234", salt);
  utilisateurs.push({
    id: 1,
    nom: "Louis Musole",
    email: "louis@drcmind.com",
    password: defaultHashedPassword,
  });
  utilisateurs.push({
    id: 2,
    nom: "Amani Bisimwa",
    email: "amani@drcmind.com",
    password: defaultHashedPassword,
  });
})();

module.exports = {
  cours: [
    {
      titre: "Guide complet sur mongoose",
      desc: `Dans ce cous vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/mongoose.jpg",
      duree: "01h:03min",
    },
    {
      titre: "Javascript moderne",
      desc: `Vous apprendrez dans ce cours les notions fondamentales du langae de programmation
           Javascript`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/js.jpg",
      duree: "02h:04min",
    },
    {
      titre: "MongoDB pour débutants",
      desc: `Gérer vos données avec la base de données non relationnelle MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/mongoDb.jpg",
      duree: "00h:54min",
    },
    {
      titre: "Cours Git et Github pour débutants",
      desc: `Dans ce cous vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/gitgithub.jpg",
      duree: "04h:11min",
    },
    {
      titre: "NodeJs pour débutants",
      desc: `Dans ce cous vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/nodejs.jpg",
      duree: "02h:45min",
    },
    {
      titre: "Créer une API avec NodeJs et MongoDB",
      desc: `Dans ce cous vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/restapi.jpg",
      duree: "01h:33min",
    },
    {
      titre: "Créer des applications NodeJs Sécurisées",
      desc: `Dans ce cous vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/safenodejs.jpg",
      duree: "02h:06min",
    },
    {
      titre: "Cloner Youtube avec Flutter Web",
      desc: `Dans ce cous vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/youtubeclone.jpg",
      duree: "01h:00min",
    },
  ],
  utilisateurs,
};
