import { faker } from "@faker-js/faker";

const ArticleList = [
  {
    id: 0,
    src: "https://picsum.photos/300/200?random=1",
    name: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.person.fullName(),                 
    stars: (Math.random() + 4).toFixed(1),    
  },
  {
    id: 1,
    src: "https://picsum.photos/300/200?random=2",
    name: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.person.fullName(),                        
    stars: (Math.random() + 4).toFixed(1),    
  },
  {
    id: 2,
    src: "https://picsum.photos/300/200?random=3",
    name: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.person.fullName(),                    
    stars: (Math.random() + 4).toFixed(1),    
  },
];

export default ArticleList;
