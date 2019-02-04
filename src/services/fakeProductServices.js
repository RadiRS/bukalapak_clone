const products = [
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    name: 'Terminator',
    imgUrl: 'https://picsum.photos/200/300',
    price: '828.54',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia sed animi consequuntur error iure amet, voluptatem rerum id architecto!'
  },
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    name: 'Die Hard',
    imgUrl: 'http://lorempixel.com/640/480',
    price: '648.04',
    description:
      'Voluptatem quia praesentium quia non ducimus nam sunt. Consequuntur voluptatem rerum. Et est ea velit qui minima expedita quibusdam illum. Velit aut delectus et repellat nemo occaecati non reprehenderit molestiae. Nihil vel culpa debitis.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    name: 'Get Out',
    imgUrl: 'http://lorempixel.com/240/480',
    price: '649.75',
    description:
      'Voluptatem ut sunt et nihil voluptas fugit ea. Rerum qui cumque. Sint tempore quasi corporis omnis eligendi blanditiis aperiam animi. Nemo provident quos pariatur nobis beatae ad. Nihil cupiditate hic sed.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    name: 'Trip to Italy',
    imgUrl: 'http://lorempixel.com/340/480',
    price: '340.76',
    description:
      'Quod enim aut deleniti vel perferendis. Ullam eveniet fugiat et quis nulla. Enim illum officiis nihil blanditiis saepe et fugit aliquam qui. Ut ea eum repellat repellendus. Error sequi facere accusantium qui esse sunt reiciendis. Ullam dolores iste aperiam voluptas iusto fugiat.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181a',
    name: 'Airplane',
    imgUrl: 'http://lorempixel.com/440/480',
    price: '182.11',
    description:
      'Recusandae autem repellendus optio eligendi nisi aliquid illo optio. Enim quasi voluptatem id perspiciatis enim laborum nihil. Quo nisi aspernatur est fugiat temporibus maiores est cum. Atque perspiciatis ut provident delectus voluptatibus laboriosam itaque. Modi perspiciatis eius temporibus nesciunt. Rem nam dolorem repellendus unde quia cumque ea.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181b',
    name: 'Wedding Crashers',
    imgUrl: 'http://lorempixel.com/140/480',
    price: '694.71',
    description:
      'Voluptatem recusandae iure et modi eos repellat ut temporibus. Quidem velit quia. Ipsam sint qui dicta molestiae cum. Est tempore rerum ratione provident omnis. Exercitationem dolore molestiae aliquam eum adipisci et deleniti.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181e',
    name: 'Gone Girl',
    imgUrl: 'http://lorempixel.com/540/480',
    price: '40206534',
    description:
      'Molestiae eius laborum libero. Error reiciendis et et tenetur earum non aspernatur quis alias. Iusto est eaque perferendis ratione ab.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181f',
    name: 'The Sixth Sense',
    imgUrl: 'http://lorempixel.com/640/380',
    price: '769.63',
    description:
      'Vel aliquid corporis sunt dicta. Dignissimos sint dolorem officiis. Ut culpa maiores odit aut sit est sint voluptas. In sed et esse nihil ut illo tenetur quia totam. Consectetur voluptate beatae amet fuga ratione adipisci consectetur architecto.'
  },
  {
    _id: '5b21ca3eeb7f6fbccd471821',
    name: 'The Avengers',
    imgUrl: 'http://lorempixel.com/640/480',
    price: '194.91',
    description:
      'Consectetur vel natus quam perspiciatis. Impedit quaerat recusandae quia deleniti vel recusandae expedita fuga. Delectus rerum corrupti et quae ut enim.'
  }
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(m => m._id === id);
}

export function saveProduct(product) {
  let productInDb = products.find(m => m._id === product._id) || {};
  productInDb.name = product.name;
  productInDb.genre = genresAPI.genres.find(g => g._id === product.genreId);
  productInDb.imgUrl = product.imgUrl;
  productInDb.description = product.description;

  if (!productInDb._id) {
    productInDb._id = Date.now().toString();
    products.push(productInDb);
  }

  return productInDb;
}

export function deleteProduct(id) {
  let productInDb = products.find(m => m._id === id);
  products.splice(products.indexOf(productInDb), 1);
  return productInDb;
}
