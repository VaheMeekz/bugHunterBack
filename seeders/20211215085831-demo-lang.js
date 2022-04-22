"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Langs",
      [
        {
          id: 1,
          selector: "HomeOneTitle",
          langEng:
            "Maintaining security is a priority. We will help you to make your website more secure",
          langRu:
            "Обеспечение безопасности является приоритетом. Мы поможем сделать ваш сайт более безопасным",
          langArm:
            "Անվտանգության պահպանումն առաջնահերթություն է։ Մենք կօգնենք ձեզ ավելի անվտանգ դարձնել ձեր կայքը",
          page: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          selector: "HomeTwoTitle",
          langEng: "We Have More Than About 25+ Years Experience It Solutions.",
          langRu: "У нас более 25 лет опыта в сфере ИТ-решений.",
          langArm: "Մենք ունենք դրա լուծումների ավելի քան 25+ տարվա փորձ:",
          page: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          selector: "HomeTwoText",
          langEng:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur s.",
          langRu:
            "Боль сама по себе я",
          langArm:
            "Ցավն ինքնին ",
          page: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          selector: "AboutOneTitle",
          langEng:
            "The priority for us is security. Join our team to work together to secure the Internet",
          langRu:
            "Для нас приоритетом ",
          langArm:
            "Մեզ համար առաջնայինը",
          page: "AboutUs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          selector: "AboutTwoTitle",
          langEng: "We Have More Than About 25+ Years Experience It Solutions.",
          langRu: "У нас более 25 лет опыта в сфере ИТ-решений.",
          langArm: "Մենք ունենք դրա լուծումների ավելի քան 25+ տարվա փորձ:",
          page: "AboutUs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          selector: "AboutTwoText",
          langEng:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in r",
          langRu:
            "Боль сама п",
          langArm:
            "Ցավն ինքնին ցավի բանալին",
          page: "AboutUs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          selector: "AboutForTitil",
          langEng: "Lorem Ipsum",
          langRu: "Տեքստ",
          langArm: "Текст",
          page: "AboutUs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          selector: "AboutForTextOne",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          langRu:
            "Lorem Ipsum - ",
          langArm:
            "Lorem Ipsum-ը ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          selector: "AboutForTextTwo",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          langRu: "Lorem Ipsum - ",
          langArm:
            "Lorem Ipsum-ը տպագրութ",
          page: "AboutUs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          selector: "AboutForTextThree",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          langRu: "Lorem Ipsum - ",
          langArm: "Lorem Ipsum-",
          page: "AboutUs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          selector: "PartnersOneTitle",
          langEng: "Lets hack together",
          langRu: "Давайте вместе",
          langArm: "Եկեք թալանենք միասին",
          page: "Partners",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          selector: "PartnersOneText",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          langRu: "Lorem Ipsum - это просто ",
          langArm: "Lorem Ipsum-ը տպագրության",
          page: "Partners",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          selector: "HackersOneTitle",
          langEng: "Lets hack together",
          langRu: "Давайте вместе",
          langArm: "Եկեք թալանենք միասին",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          selector: "HackersOneText",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          langRu: "Lorem Ipsum - это просто .",
          langArm: "Lorem Ipsum-ը տպագրության և",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          selector: "HackersThreeTitle",
          langEng: "You can have a hack resume",
          langRu: "Вы можете взломать резюме",
          langArm: "Դուք կարող եք ունենալ հաքերային ռեզյումե",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 16,
          selector: "HackersThreeTextOne",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          langRu: "Lorem Ipsum - ",
          langArm: "Lorem Ipsum-ը տպագրության և տ",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          selector: "HackersThreeTextTwo",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          langRu:
            "Lorem Ipsum - это просто фиктивный текст полиграфической и наборной индустрии.",
          langArm:
            "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության կեղծ տեքստ է",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          selector: "HackersThreeTextThree",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          langRu:
            "Lorem Ipsum - это просто фиктивный текст полиграфической и наборной индустрии.",
          langArm:
            "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության կեղծ տեքստ է",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 19,
          selector: "HackersThreeTextFor",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          langRu:
            "Lorem Ipsum - это просто фиктивный текст полиграфической и наборной индустрии.",
          langArm:
            "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության կեղծ տեքստ է",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 20,
          selector: "HackersFiveTitle",
          langEng: "You can have a hack resume",
          langRu: "Вы можете взломать резюме",
          langArm: "Դուք կարող եք ունենալ հաքերային ռեզյումե",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 21,
          selector: "HackersFiveTextOne",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          langRu: "Lorem Ipsum -.",
          langArm: "Lorem Ipsum-ը տ",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 22,
          selector: "HackersFiveTextTwo",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          langRu:
            "Lorem Ipsum - это просто фиктивный текст полиграфической и наборной индустрии.",
          langArm:
            "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության կեղծ տեքստ է",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 23,
          selector: "HackersFiveTextThree",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          langRu:
            "Lorem Ipsum - это просто фиктивный текст полиграфической и наборной индустрии.",
          langArm:
            "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության կեղծ տեքստ է",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 24,
          selector: "HackersFiveTextFor",
          langEng:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          langRu:
            "Lorem Ipsum - это просто фиктивный текст полиграфической и наборной индустрии.",
          langArm:
            "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության կեղծ տեքստ է",
          page: "Hackers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Langs", null, {});
  },
};
