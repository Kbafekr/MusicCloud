"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 1,
          albumId: 1,
          title: "Nobody Speak",
          description: "Hip-Hop/Rap",
          url: "https://soundclouddata.s3.amazonaws.com/_Nobody+Speak_+feat.+Run+The+Jewels+-+DJ+Shadow+(The+Mountain+Will+Fall)+%5BHQ+Audio%5D.mp3",
          imageUrl:
            "https://c-fa.cdn.smule.com/rs-s79/arr/9a/2c/9e983943-aedd-439f-9656-e6ae266d3fb5_1024.jpg",
        },
        {
          userId: 2,
          albumId: 2,
          title: "Ready For War",
          description: "Epic Intense Hip-hop",
          url: "https://soundclouddata.s3.amazonaws.com/2WEI%2C+Joznez%2C+Kataem+-+Ready+For+War+(Official+Lyric+Video+%26+Audio).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/Zn-VQ-B1ODA/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 3,
          title: "Dies Irae (feat. Blak Prez)",
          description: "Electronic Classical/Rap",
          url: "https://soundclouddata.s3.amazonaws.com/Apashe+-+Dies+Irae+(feat.+Black+Prez).mp3",
          imageUrl:
            "https://i1.sndcdn.com/artworks-000447165090-3o58w1-t500x500.jpg",
        },
        {
          userId: 1,
          albumId: 4,
          title: "Chemicals (feat. Neoni)",
          description: "Electronic/Alternative Modern Pop",
          url: "https://soundclouddata.s3.amazonaws.com/Besomorph+-+Chemicals+(feat.+Neoni).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/e4-raurU5zI/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 5,
          title: "Happier Than Ever",
          description: "Alternative Rock/Indie Pop",
          url: "https://soundclouddata.s3.amazonaws.com/Billie+Eilish+-+Happier+Than+Ever+(Official+Music+Video).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/GK10mDpZZ_w/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 6,
          title: "Boukan",
          description: "Japanese Post-Hardcore/Math-Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Boukan.mp3",
          imageUrl:
            "https://i1.jpopasia.com/albums/4/29267_n9c.jpg",
        },
        {
          userId: 2,
          albumId: 7,
          title: "Caravan",
          description: "Jazz Score ",
          url: "https://soundclouddata.s3.amazonaws.com/Caravan.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/38CRu1rCaKg/maxresdefault.jpg",
        },
        {
          userId: 2,
          albumId: 8,
          title: "Dr. Bones",
          description: "Modern Jazz/Swing Ska",
          url: "https://soundclouddata.s3.amazonaws.com/Cherry+Poppin'+Daddies+-+Dr.+Bones.mp3",
          imageUrl:
          "https://i.ytimg.com/vi/AZo5rV8xuEA/hqdefault.jpg",
        },
        {
          userId: 2,
          albumId: 9,
          title: "Childhodd Memories",
          description: "Warm Alternative Game BGM",
          url: "https://soundclouddata.s3.amazonaws.com/Childhood+memories.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/_rdlVC1hzdk/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 10,
          title: "Under the Influence",
          description: "R&B Soul",
          url: "https://soundclouddata.s3.amazonaws.com/Chris+Brown+-+Under+The+Influence+(Audio).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/xy8HNniRsc4/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 11,
          title: "Freeze Me",
          description: "Alternative Indie Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Death+From+Above+1979+-+Freeze+Me+(Official+Audio).mp3",
          imageUrl:
            "https://i.scdn.co/image/ab67616d0000b27320ff5d1d92eb88e6ab5822a5",
        },
        {
          userId: 1,
          albumId: 12,
          title: "Dynasties & Dystopia",
          description: "Alternative Indie Rap/Pop",
          url: "https://soundclouddata.s3.amazonaws.com/Denzel+Curry%2C+Gizzle%2C+Bren+Joy+-+Dynasties+%26+Dystopia+%7C+Arcane+League+of+Legends+%7C+Riot+Games+Music.mp3",
          imageUrl:
            "https://images.genius.com/1920168e7f50f7b1c96710cfa91d2c7d.1000x1000x1.jpg",
        },
        {
          userId: 2,
          albumId: 13,
          title: "Dream a Little Dream of Me",
          description: "Modern Jazz/Pop Cover",
          url: "https://soundclouddata.s3.amazonaws.com/Dream+a+Little+Dream+of+Me.mp3",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e0285d4a567ff4e2aec1fa796b6",
        },
        {
          userId: 2,
          albumId: 14,
          title: "Needle in the Hay",
          description: "Indie Folk",
          url: "https://soundclouddata.s3.amazonaws.com/Elliott+Smith+-+Needle+In+The+Hay+(from+Elliott+Smith).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/EgNgvCLRqWc/maxresdefault.jpg",
        },
        {
          userId: 2,
          albumId: 15,
          title: "Fair",
          description: "Indie Pop/Folk",
          url: "https://soundclouddata.s3.amazonaws.com/Fair.mp3",
          imageUrl:
            "https://m.media-amazon.com/images/I/51y9GJkWfjL._SS500_.jpg",
        },
        {
          userId: 1,
          albumId: 16,
          title: "Gourmet Race Remix",
          description: "Drumstep/Dubstep 8-bit",
          url: "https://soundclouddata.s3.amazonaws.com/Gourmet+Race+-+Drumstep+%5B+dj-Jo+Remix+%5D.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/Se1uh3PS78Y/mqdefault.jpg",
        },
        {
          userId: 3,
          albumId: 17,
          title: "Interstellar Main Theme Piano",
          description: "Classical Cover",
          url: "https://soundclouddata.s3.amazonaws.com/Hans+Zimmer+-+Interstellar+-+Main+Theme+(Piano+Version)+%2B+Sheet+Music.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/UDVtMYqUAyw/hqdefault.jpg",
        },
        {
          userId: 1,
          albumId: 18,
          title: "Heart_Shaped Box (Virtu Remix)",
          description: "Electronic Modern Grunge",
          url: "https://soundclouddata.s3.amazonaws.com/Heart-Shaped+Box+(VIRTU+Remix).mp3",
          imageUrl:
            "https://m.media-amazon.com/images/I/71CmdD0BONL._SS500_.jpg",
        },
        {
          userId: 1,
          albumId: 19,
          title: "Analog Logic",
          description: "Epic Hybrid Futuristic Electronic Music",
          url: "https://soundclouddata.s3.amazonaws.com/Hi-Finesse+-+Analog+Logic+(Epic+Hybrid+Futuristic+Trailer+Music).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/l6PH6Og4E5w/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 20,
          title: "Long Cool Woman (In a Black Dress)",
          description: "Alternative Blues/Rock",
          url: "https://soundclouddata.s3.amazonaws.com/hollies-long-cool-woman-in-a-black-dress.mp3",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/5/59/Long_Cool_Woman_in_a_Black_Dress.jpg",
        },
        {
          userId: 3,
          albumId: 21,
          title: "Apple Alarm Sound Effect",
          description: "Alarm Sound Effect from iPhone",
          url: "https://soundclouddata.s3.amazonaws.com/iPhone+Radar+Alarm_Ringtone+(Apple+Sound)+-+Sound+Effect+for+Editing.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/1uLcHue0rZ4/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 22,
          title: "Hollow Purple",
          description: "Electronic Dark Dubstep",
          url: "https://soundclouddata.s3.amazonaws.com/Jujutsu+Kaisen+-+Hollow+Purple+(Ultra+Epic+Cover).mp3",
          imageUrl:
            "https://miro.medium.com/max/1400/0*UuxDSONm1W5mvt_d.jpg",
        },
        {
          userId: 1,
          albumId: 23,
          title: "Jungle Japes",
          description: "Tribal Jazz Video Game Music",
          url: "https://soundclouddata.s3.amazonaws.com/Jungle+Japes+Super+Smash+Melee.mp3",
          imageUrl:
            "https://images.gamebanana.com/img/ss/mods/58a9c1c0e94dc.jpg",
        },
        {
          userId: 2,
          albumId: 24,
          title: "Intimidated",
          description: "Wave/Pop Music",
          url: "https://soundclouddata.s3.amazonaws.com/kaytranada-intimidated-audio-ft-her.mp3",
          imageUrl:
            "https://images.genius.com/5f2f2731f4d937d5445b51492d2586df.999x999x1.png",
        },
        {
          userId: 1,
          albumId: 25,
          title: "Loki Trailer Music",
          description: "Dark Electronic Music",
          url: "https://soundclouddata.s3.amazonaws.com/Loki+Trailer+Music+%7C+EPIC+VERSION.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/4MDRWT9AlgU/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 26,
          title: "Someone To Spend Time With",
          description: "Alternative/Indie",
          url: "https://soundclouddata.s3.amazonaws.com/Los+Retros++Someone+To+Spend+Time+With.mp3",
          imageUrl:
            "https://i.scdn.co/image/ab67616d0000b273a1f060b534d1d9c859acc73f",
        },
        {
          userId: 3,
          albumId: 27,
          title: "Stay",
          description: "R&B/Soul, Hip-Hop/Rap",
          url: "https://soundclouddata.s3.amazonaws.com/Mac+Miller++Stay++Lyrics+Songs.mp3",
          imageUrl:
            "https://i1.sndcdn.com/artworks-000406849008-ydddi5-t500x500.jpg",
        },
        {
          userId: 1,
          albumId: 28,
          title: "Metamorphose",
          description: "Japanese Math Rock/Post-Hardcore",
          url: "https://soundclouddata.s3.amazonaws.com/Metamorphose.mp3",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0065/8482/7956/products/ling-tosite-sigure-imperfect.jpg?v=1596057485",
        },
        {
          userId: 2,
          albumId: 29,
          title: "Misery Business",
          description: "Pop-Punk/Emo",
          url: "https://soundclouddata.s3.amazonaws.com/Misery+Business.mp3",
          imageUrl:
            "https://m.media-amazon.com/images/I/61cKkLqbLLL.jpg",
        },
        {
          userId: 1,
          albumId: 30,
          title: "Wonderland",
          description: "Alternative/Indie",
          url: "https://soundclouddata.s3.amazonaws.com/Neoni+-+WONDERLAND+(Lyrics).mp3",
          imageUrl:
          "https://i.ytimg.com/vi/0bTVSSiAgZs/mqdefault.jpg",
        },
        {
          userId: 1,
          albumId: 31,
          title: "Something in the Way (Illenium Remix)",
          description: "Modern Electronic Grunge Cover",
          url: "https://soundclouddata.s3.amazonaws.com/Nirvana+-+Something+In+The+Way+(ILLENIUM+Remix).mp3",
          imageUrl:
            "https://i1.sndcdn.com/artworks-G1Zh95kFgk7Y3BEt-OkfYjQ-t500x500.jpg",
        },
        {
          userId: 1,
          albumId: 32,
          title: "I Write Sins Not Tragedies (D'Acierno Remix)",
          description: "Emo Pop-Punk",
          url: "https://soundclouddata.s3.amazonaws.com/Panic!+At+the+Disco+-+I+Write+Sins+Not+Tragedies+(D'Acierno+Remix).mp3",
          imageUrl:
            "https://i1.sndcdn.com/artworks-000248795568-5h02ip-t500x500.jpg",
        },
        {
          userId: 2,
          albumId: 33,
          title: "Maggie's Farm",
          description: "Rap Rock, Hip-Hop Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Rage+Against+The+Machine+-+Maggie's+Farm+(Audio).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/q3euAfNhuR4/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 34,
          title: "Transhuman",
          description: "Epic Massive Hybrid Drama Music",
          url: "https://soundclouddata.s3.amazonaws.com/Really+Slow+Motion+-+Transhuman+(Epic+Massive+Hybrid+Drama).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/_tMnhDyIwCg/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 35,
          title: "Blockbuster Night Part 1",
          description: "Hip-Hop Rap",
          url: "https://soundclouddata.s3.amazonaws.com/Run+The+Jewels+-+Blockbuster+Night+Part+1+(Official+Video).mp3",
          imageUrl:
            "https://media.pitchfork.com/photos/5929fe940c2bba1b7de04193/1:1/w_450%2Cc_limit/60fc2402.jpg",
        },
        {
          userId: 1,
          albumId: 36,
          title: "Seven Nation Army (Glitch Mob Remix)",
          description: "Electronic Garage Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Seven+Nation+Army+(Glitch+Mob+Remix)+-+Lyric+Video.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/IbvNgLYPSIs/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 37,
          title: "F**K YOU",
          description: "Alternative/Indie",
          url: "https://soundclouddata.s3.amazonaws.com/Silent+Child+-+F**K+YOU+(lyrics).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/L7T6UOkHkJo/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 38,
          title: "Smells Like Teen Spirit (Malia Remix)",
          description: "Modern Emotional Grunge",
          url: "https://soundclouddata.s3.amazonaws.com/Smells+Like+Teen+Spirit.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/p5M1sWA0J0Y/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 39,
          title: "Solo",
          description: "Indie, Pop/Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Solo.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/fL1pnzQj5j8/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 21,
          title: "Squidward Walking Sound Effect",
          description: "Sound Effects",
          url: "https://soundclouddata.s3.amazonaws.com/Squidward+walking+sound+effect.mp3",
          imageUrl:
          "https://pbs.twimg.com/media/Bzmf25aCIAABBDi.jpg",
        },
        {
          userId: 2,
          albumId: 40,
          title: "Strip My Mind",
          description: "Alternative/Indie, R&B/Soul",
          url: "https://soundclouddata.s3.amazonaws.com/Strip+My+Mind.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/woLb2dkqRYs/maxresdefault.jpg",
        },
        {
          userId: 3,
          albumId: 41,
          title: "Succession Main Theme Piano",
          description: "Classical Instrumental",
          url: "https://soundclouddata.s3.amazonaws.com/Succession+Main+Theme+-+Piano+(Advance+difficulty).mp3",
          imageUrl:
            "https://i.ytimg.com/vi/Jy7FMagiTFk/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 42,
          title: "STFD",
          description: "Electro-Pop/ Dance Music",
          url: "https://soundclouddata.s3.amazonaws.com/TeZATalks+-+STFD+%5BLyric+Video%5D+*FLASH+WARNING*.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/XyNHIsp_3k0/maxresdefault.jpg",
        },
        {

          userId: 1,
          albumId: 43,
          title: "Hey Kids!!!",
          description: "Japanese Rock Alternative/Indie",
          url: "https://soundclouddata.s3.amazonaws.com/THE+ORAL+CIGARETTES+-+Kyouran+Hey+Kids!!+(cover).mp3",
          imageUrl:
            "https://i.ebayimg.com/images/g/bDkAAOSwtRBZuQ4V/s-l400.jpg",
        },
        {
          userId: 3,
          albumId: 44,
          title: "50 Ways to Say Goodbye",
          description: "Pop Rock/Folk Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Train+-+50+Ways+To+Say+Goodbye.mp3",
          imageUrl:
          "https://methodshop.com/wp-content/uploads/train-band.jpg",
        },
        {
          userId: 1,
          albumId: 45,
          title: "Worst in Me",
          description: "Dance/Electronic",
          url: "https://soundclouddata.s3.amazonaws.com/Unlike+Pluto+-+Worst+In+Me+%5BOfficial+Lyric+Video%5D.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/igQBHPvh1lc/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 46,
          title: "The Day the World Went Away (Ramin Djawadi Remix)",
          description: "Grunge Rock/Post-Hardcore",
          url: "https://soundclouddata.s3.amazonaws.com/Westworld+S4+Official+Soundtrack+%7C+The+Day+the+World+Went+Away+(NIN+Cover)+-+Ramin+Djawadi.mp3",
          imageUrl:
            "https://i1.sndcdn.com/artworks-okjrAW6V7VCy-0-t500x500.jpg",
        },
        {
          userId: 1,
          albumId: 47,
          title: "Craving",
          description: "Electronic Alternative Rock",
          url: "https://soundclouddata.s3.amazonaws.com/YMIR+-+Craving.mp3",
          imageUrl:
          "https://i.ytimg.com/vi/NAGj2FpW4ok/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 47,
          title: "Tripwire",
          description: "Electronic Alternative Rock",
          url: "https://soundclouddata.s3.amazonaws.com/YMIR+-+Tripwire.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/IScEQa2MJUk/maxresdefault.jpg",
        },
        {
          userId: 1,
          albumId: 48,
          title: "Gou Ni Moyu",
          description: "Japanese Post-Hardcore Rock",
          url: "https://soundclouddata.s3.amazonaws.com/Sokoninaru+-+Gou+Ni+Moyu.mp3",
          imageUrl:
            "https://i.ytimg.com/vi/Nl4Z5f4QwEY/sddefault.jpg",
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Songs", null, {});
  },
};
