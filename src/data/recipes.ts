import { Recipe } from '../components/RecipeList';

export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Sambuusa',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2066&auto=format&fit=crop',
    description: 'Crispy triangular pastries filled with spiced meat or vegetables, perfect as an appetizer or snack.',
    prepTime: '45 daqiiqo',
    difficulty: 'Dhexdhexaad',
    ingredients: [
      '2 koob oo bur ah',
      '1/2 koob oo saliid ah',
      '1/2 koob oo biyo ah',
      '1 pound oo hilib ground ah',
      '2 basal oo la jarjaray',
      '3 qardho oo toon ah',
      'Cusboo iyo basbaas',
      'Caleen dhigir ah',
      'Basal jaad ah'
    ],
    instructions: [
      'Buurka, saliida iyo biyaha isku dar waxaadna sameysaa cajiin.',
      'Cajinka gabi muddo 30 daqiiqo ah.',
      'Digsi ku shub saliid, ku dar basasha oo shiil ilaa uu noqdo mid cas.',
      'Ku dar hilibka, toonka, cusbada iyo basbaasta.',
      'Karso ilaa hilibku bislaado, ku dar caleen dhigirka iyo basal jaadka, kadibna dami.',
      'Cajiin ka samee wax yar, ku shub hilibka, oo ka dhig saddex geesood.',
      'Sambuuska ku shiil saliid kulul illaa uu noqo mid dahabi ah.',
      'Kusoo bax saxan oo waxaa diyaar u ah in la cuno.'
    ]
  },
  {
    id: 2,
    title: 'Baasto iyo Hilib',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop',
    description: 'Pasta served with flavorful meat sauce, a popular everyday dish in Somali cuisine.',
    prepTime: '30 daqiiqo',
    difficulty: 'Fudud',
    ingredients: [
      '1 baakad oo baasto ah',
      '1 pound oo hilib ground ah',
      '2 yaanyo oo weyn',
      '1 basal',
      '3 qardho oo toon ah',
      'Basbaas iyo cusboo',
      'Saliid',
      'Bariis (oo diyaarsan)'
    ],
    instructions: [
      'Baastada ku kari biyo kulul oo cusbo leh, raac tilmaamaha baakada.',
      'Shiil basasha ilaa uu noqdo mid casaan ah.',
      'Ku dar hilibka ground-ka ah, karis ilaa uu isbedelo midabkiisa.',
      'Ku dar toonka iyo basbaasta, iyo koob biyo ah.',
      'Kor ka shub yaanyada oo jarjaran.',
      'Karso 15-20 daqiiqo oo dabool ugu dhamee.',
      'Baastada oo la miiriyay ku shub saxan, kadibna ku shub maraqqa hilibka.',
      'Waxaa diyaar u ah in la cuno.'
    ]
  },
  {
    id: 3,
    title: 'Bariis iskukaris',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=2070&auto=format&fit=crop',
    description: 'Fragrant rice cooked with vegetables and meat, seasoned with traditional Somali spices.',
    prepTime: '40 daqiiqo',
    difficulty: 'Dhexdhexaad',
    ingredients: [
      '2 koob oo bariis ah',
      '1/2 kilo oo hilib ah (adhi ama lo\')',
      '2 basal oo la jarjaray',
      '2 yaanyo oo weyn',
      '2 barbarooni (ikhtiyaari)',
      '1 koob oo khudaar la jarjaray (karooto iyo digir)',
      'Xawaash Soomaali',
      'Basbaas iyo cusboo',
      '3 qaaddo oo saliid ah'
    ],
    instructions: [
      'Bariiska u dhaq si fiican, kadibna biyo ku qabo 15 daqiiqo.',
      'Shiil basasha ilaa uu noqdo mid casaan ah.',
      'Ku dar hilibka oo la jarjaray, shiil ilaa uu midabkiisu isbedelo.',
      'Ku dar yaanyada, barbarooniga, xawaashka, basbaasta, iyo 2 koob oo biyo ah.',
      'Karso 20 daqiiqo illaa hilibku bislaado.',
      'Ku dar khudaarta, kadibna kor saar bariiska oo la miiriyay.',
      'Karso 15-20 daqiiqo oo dabool illaa bariiska uu bislaado.',
      'Isku qas si fiican, kadibna kusoo gudbi saxan weyn.'
    ]
  },
  {
    id: 4,
    title: 'Malawax',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=2080&auto=format&fit=crop',
    description: 'Sweet Somali pancakes usually served with sugar and ghee for breakfast.',
    prepTime: '25 daqiiqo',
    difficulty: 'Fudud',
    ingredients: [
      '2 koob oo bur ah',
      '1 koob oo biyo ah',
      '2 ukun',
      '1/4 koob oo sonkor ah',
      'Yar usha',
      'Saliid ama subag',
      'Sonkor iyo subag (loogu talogalay in lagu cuno)'
    ],
    instructions: [
      'Dhammaan walxaha ku dar weelka waxaadna isku dartaa si ay u noqdaan qoyaan.',
      'Cajiinka dabooli waxaadna dhigtaa 10 daqiiqo.',
      'Birowga shid, ku shub saliid ama subag yar.',
      'Kala bar koob, ku shub cajiinka, si fudud u wareejin illaa uu si fiican u karsado.',
      'Malawaxda kasoo qaad markay dhinaca hoose uu dahabi noqdo.',
      'Ka sii wad ilaa cajiinku dhammaado.',
      'Kor kaga dar subag iyo sonkor markaad cunaysid.'
    ]
  },
  {
    id: 5,
    title: 'Cambuulo',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=2037&auto=format&fit=crop',
    description: 'A hearty dish made with beans, corn, and ghee, often served with sugar and sesame oil.',
    prepTime: '35 daqiiqo',
    difficulty: 'Fudud'
  },
  {
    id: 6,
    title: 'Suqaar',
    image: 'https://images.unsplash.com/photo-1624726175512-8ccda36d0980?q=80&w=1170&auto=format&fit=crop',
    description: 'Diced meat sautéed with vegetables and spices, can be served with rice or flatbread.',
    prepTime: '30 daqiiqo',
    difficulty: 'Fudud'
  },
  {
    id: 7,
    title: 'Masago',
    image: 'https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1972&auto=format&fit=crop',
    description: 'Traditional Somali sweet made from ground corn, milk, and sugar, flavored with cardamom.',
    prepTime: '40 daqiiqo',
    difficulty: 'Dhexdhexaad'
  },
  {
    id: 8,
    title: 'Soor',
    image: 'https://pbs.twimg.com/media/EVUORfYXkAY2Ce0.jpg:large',
    description: 'Cunto macaan oo laga sameeyo galley, oo inta badan lagu cuno subag iyo sonkor ama la iska cuno fuud.',
    prepTime: '35 daqiiqo',
    difficulty: 'Fudud',
    ingredients: [
      '2 koob oo bur galley ah',
      '4 koob oo biyo ah',
      'Cusbo (wax yar)',
      'Subag lo\' ama geel',
      'Sonkor (loogu talogalay in lagu cuno)',
      'Fuud (loogu talogalay in lagu cuno)'
    ],
    instructions: [
      'Biyo kari, markay karaan ku dar cusbo yar',
      'Si tartiib ah ugu shub bur galleyda, had iyo jeer isku qas',
      'Dabka yareey, oo had iyo jeer isku qas si uusan u guban',
      'Kar muddo 15-20 daqiiqo ah, ilaa uu noqdo dhoobabuur si fiican loo isku daray',
      'Waxaad ku cuni kartaa subag iyo sonkor',
      'Ama fuud (maraq hilib, digaag, ama khudaar) kula cun.'
    ]
  },
  {
    id: 9,
    title: 'Digir iyo Bariis',
    image: 'https://images.unsplash.com/photo-1547050605-2f268cd5daf0?q=80&w=1974&auto=format&fit=crop',
    description: 'A nutritious dish of beans and rice cooked with spices, onions, and garlic. A Somali staple food.',
    prepTime: '50 daqiiqo',
    difficulty: 'Dhexdhexaad'
  },
  {
    id: 10,
    title: 'Caano Geel',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuW77jQ26Z0GeFMsyp3PYjdRNs36ufhAjVLQ&s',
    description: 'Caano geel macaan oo fareesho leh, waxay leedahay nafaqo badan, waxaana loo arkaa cabitaan caafimaad leh oo dhaqanka Soomaaliyeed muhiim u ah.',
    prepTime: '5 daqiiqo',
    difficulty: 'Fudud'
  },
  {
    id: 11,
    title: 'Caano Lo\'',
    image: 'https://www.dairypesa.com/wp-content/uploads/2015/10/myths-about-cows-milk.jpg',
    description: 'Caano lo\' daray oo macaan, oo lagu cabbo quraacda ama la isticmaalo karinta cuntada. Waa mid ka mid ah caanooyinka ugu caansan ee Soomaalida.',
    prepTime: '5 daqiiqo',
    difficulty: 'Fudud'
  },
  {
    id: 12,
    title: 'Subag Geel',
    image: 'https://www.veryrareonline.com/wp-content/uploads/2019/08/camel-ghee.jpg',
    description: 'Subag ka sameysan caano geel oo lagu kariyaa cuntada, looguna daro shaaha, waxeyna leedahay dhadhan gaar ah.',
    prepTime: '120 daqiiqo',
    difficulty: 'Adag'
  },
  {
    id: 13,
    title: 'Garoor',
    image: 'https://healthwire.pk/wp-content/uploads/2022/09/camel-milk-benefits.jpg',
    description: 'Caano geel ama caano lo\' oo la qaso, taasoo isku bedeleysa dhadhan iyo xaalad cusub. Waa cabbitaan ay jecel yihiin dadka Soomaaliyeed.',
    prepTime: '30 daqiiqo',
    difficulty: 'Dhexdhexaad'
  }
]; 