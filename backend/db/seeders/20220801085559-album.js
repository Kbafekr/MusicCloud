"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
     options.tableName = 'Albums';
    return queryInterface.bulkInsert(options,
      [
        {
          userId: 1,
          title: "The Mountain Will Fall",
          description: "Instrumental Hip-Hop/Electronic",
          imageUrl:
            "https://m.media-amazon.com/images/I/81WYpjUeKgL._SL1200_.jpg",
        },
        {
          userId: 2,
          title: "Ready For War",
          description: "Epic Intense Hip-hop by Kataem",
          imageUrl:
            "https://i.ytimg.com/vi/Zn-VQ-B1ODA/maxresdefault.jpg",
        },
        {
          userId: 3,
          title: "Requiem",
          description: "Electronic Classical/Rap",
          imageUrl:
            "https://i.ytimg.com/vi/eB741SdHKuI/maxresdefault.jpg",
        },
        {
          userId: 1,
          title: "Chemicals",
          description: "Electronic Modern Pop by Besomorph (2021)",
          imageUrl:
            "https://i1.sndcdn.com/artworks-SHGPero2SvVy5S0t-dg0kOA-t240x240.jpg",
        },
        {
          userId: 3,
          title: "Happier Than Ever",
          description: "Second Studio Album by Billie Eilish (2021)",
          imageUrl:
            "https://i.ytimg.com/vi/GK10mDpZZ_w/maxresdefault.jpg",
        },
        {
          userId: 1,
          title: "#4",
          description: "Debut Album of Ling Tosite Sigure (2005)",
          imageUrl:
            "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/c3/2b/90/c32b9038-8c74-4de8-fb99-4a60fa96263e/JK_sigure_no4.jpg/600x600bf-60.jpg",
        },
        {
          userId: 2,
          title: "Whiplash Soundtrack",
          description: "Soundtrack from the Feature Film Whiplash(2014)",
          imageUrl:
            "https://i1.sndcdn.com/artworks-000108404233-4j6z4b-t500x500.jpg",
        },
        {
          userId: 2,
          title: "Ferociously Stoned",
          description: "Debut Album of Cherry Poppin' Daddies (1990)",
          imageUrl:
            "https://m.media-amazon.com/images/I/818wXKColjL._SS500_.jpg",
        },
        {
          userId: 2,
          title: "Alternative Background Music",
          description: "Warm Background Music by Luxid",
          imageUrl:
            "https://img.freepik.com/premium-vector/pixel-art-game-background-grass-sky-clouds_210544-60.jpg",
        },
        {
          userId: 3,
          title: "Indigo",
          description: "Ninth Studio Album from Chris Brown (2019)",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/1/1f/Chris_Brown_-_Indigo.png",
        },
        {
          userId: 3,
          title: "Outrage! Is Now",
          description: "Third Studio Album from Death From Above 1979 (2017)",
          imageUrl:
            "https://m.media-amazon.com/images/I/81gPb4dG1HL._SY355_.jpg",
        },
        {
          userId: 1,
          title: "Arcane Soundtrack",
          description: "Soundtrack from Netflix's Arcane (2021)",
          imageUrl:
            "https://i.scdn.co/image/ab67616d0000b273d10169c17651c8b2ab5c8416",
        },
        {
          userId: 2,
          title: "Everywhere and Nowhere",
          description: "Playlist of Song Covers",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e0285d4a567ff4e2aec1fa796b6",
        },
        {
          userId: 2,
          title: "Elliot Smith",
          description: "Single from Elliot Smith (1995)",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/c/cb/Needle_in_the_Hay.jpg",
        },
        {
          userId: 2,
          title: "Villa Elaine",
          description: "Second Studio Album from Remy Zero",
          imageUrl:
            "https://i.discogs.com/PABkCMfwvnqnjMQ5ZWtRLFkabav4q40ZSj0BcLuHbMI/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1NjU4/NzEzLTE1OTU0MDAx/MTktNzQ1My5qcGVn.jpeg",
        },
        {
          userId: 1,
          title: "Kirby: SuperStar Soundtrack",
          description: "Soundtrack from the Video Game Kirby: SuperStar (1996)",
          imageUrl:
            "https://i.kym-cdn.com/entries/icons/original/000/040/399/kfcover.jpg",
        },
        {
          userId: 3,
          title: "Interstellar Soundtrack",
          description: "Piano Cover by Patrick Pietschmann",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/c/ca/Interstellar_soundtrack_album_cover.jpg",
        },
        {
          userId: 1,
          title: "Heart-Shaped Box ",
          description: "Remix of Nirvana Song by Imad Royals & Mark Johns",
          imageUrl:
            "https://m.media-amazon.com/images/I/71CmdD0BONL._SS500_.jpg",
        },
        {
          userId: 1,
          title: "Hi-Finesse",
          description: "Hybrid Electronic Music from Epic Heaven Music",
          imageUrl:
            "https://i.ytimg.com/vi/l6PH6Og4E5w/maxresdefault.jpg",
        },
        {
          userId: 3,
          title: "Distant Light",
          description: "Eleventh Studio Album from The Hollies",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/f/ff/Hollies_Distant_Light_LP.jpg",
        },
        {
          userId: 3,
          title: "Sound Effects",
          description: "Various Sound Effects",
          imageUrl:
            "https://i1.sndcdn.com/avatars-000144315921-l3kil1-t500x500.jpg",
        },
        {
          userId: 1,
          title: "Jujutsu Kaisen Soundtrack",
          description: "Music from the Anime Jujutsu Kaisen",
          imageUrl:
            "https://i.scdn.co/image/ab67616d0000b273b47d8a9e844189f69d5e58a7",
        },
        {
          userId: 1,
          title: "Soundtrack from Donkey Kong Country",
          description: "Soundtrack from the Video Game Donkey Kong Country",
          imageUrl:
            "https://i.ytimg.com/vi/sb4CjfOWnLA/hqdefault.jpg",
        },
        {
          userId: 2,
          title: "Intimidated",
          description: "EP from Kaytranada (feat. H.E.R.)",
          imageUrl:
            "https://i.ytimg.com/vi/tFzja2N_xKE/maxresdefault.jpg",
        },
        {
          userId: 1,
          title: "Loki Soundtrack",
          description: "Soundtrack from the Marvel Show Loki",
          imageUrl:
          "https://i.scdn.co/image/ab67706c0000bebba3cda736c4c2e5d3a5a49e19",
        },
        {
          userId: 3,
          title: "Someone To Spend Time With",
          description: "Album by Los Retros (2019)",
          imageUrl:
            "https://lastfm.freetls.fastly.net/i/u/ar0/e0301541c854f2d3326ff189875f8760.jpg",
        },
        {
          userId: 3,
          title: "The Divine Feminine",
          description: "Fourth Studio Album from Mac Miller (2016)",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/9/93/Mac_Miller_-_The_Divine_Feminine.png",
        },
        {
          userId: 1,
          title: "i'mperfect",
          description: "Fifth Studio Album from Ling Tosite Sigure(2013)",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6uFbUubFO4S_YR6GPmdSvlAbsdb7h8f4nI4beWKHpwnDSc2jRhe6SKFNJU9bQM4ymRXs&usqp=CAU",
        },
        {
          userId: 2,
          title: "Riot!",
          description: "Second Studio Album from Paramore (2007)",
          imageUrl:
            "https://m.media-amazon.com/images/I/91b6aYwjwjL._SL1425_.jpg",
        },
        {
          userId: 1,
          title: "Wars in a Wonderland",
          description: "Album from Neoni (2021)",
          imageUrl:
          "https://i.scdn.co/image/ab67616d0000b27381207f9d9c8eef5f3a62407f",
        },
        {
          userId: 1,
          title: "Something in the Way",
          description: "Electronic cover of the Nirvana Song by Illenium",
          imageUrl:
            "https://i1.sndcdn.com/artworks-G1Zh95kFgk7Y3BEt-OkfYjQ-t500x500.jpg",
        },
        {
          userId: 1,
          title: "I Write Sins Not Tragedies",
          description: "Cover of the Panic! At the Disco Song by D'acierno",
          imageUrl:
          "https://i1.sndcdn.com/artworks-000248795568-5h02ip-t500x500.jpg",
        },
        {
          userId: 2,
          title: "Renegades",
          description: "Fourth Studio Album by Rage Against the Machine (2000)",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/5/54/Ratm_renegades.png",
        },
        {
          userId: 1,
          title: "Really Slow Motion",
          description: "Dramatic Music from Really Slow Motion",
          imageUrl:
          "https://yt3.ggpht.com/ytc/AMLnZu9BsJpJad9Dx03g1h7hcKiPojvHjpoI0fLI1f-l2g=s900-c-k-c0x00ffffff-no-rj",
        },
        {
          userId: 1,
          title: "Run the Jewels 2",
          description: "Second Studio Album from Run the Jewels (2014)",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/9/93/RunTheJewelsRTJ2.jpg",
        },
        {
          userId: 1,
          title: "Glitch Mob",
          description: "Electronic Music from the Duo Glitch Mob",
          imageUrl:
          "https://i.ytimg.com/vi/-m7e7tCn7Bk/maxresdefault.jpg",
        },
        {
          userId: 1,
          title: "Tortured Thoughts",
          description: "Debut EP Album from Silent Child (2021)",
          imageUrl:
            "https://i.scdn.co/image/ab67616d0000b2739c582c3dd07178fd6212a50d",
        },
        {
          userId: 1,
          title: "Malia J",
          description: "Song Covers from Malia J",
          imageUrl:
          "https://i.scdn.co/image/ab67616d0000b2738bd22f040a2a2852ebeea584",
        },
        {
          userId: 1,
          title: "Solo",
          description: "Album by Prismo (2021)",
          imageUrl:
            "https://i.scdn.co/image/ab67616d0000b273f65449e0b0d9a05eeef79e48",
        },
        {
          userId: 2,
          title: "Stadium Arcadium",
          description: "Ninth Studio Album from Red Hot Chili Peppers",
          imageUrl:
            "https://i1.sndcdn.com/artworks-slIjDYdC4rQg-0-t500x500.jpg",
        },
        {
          userId: 3,
          title: "Succession SoundTrack",
          description: "Soundtrack from HBO's Succession",
          imageUrl:
          "https://i.scdn.co/image/ab67616d0000b273e654bc3bc09b6c1e013f74a3",
        },
        {
          userId: 1,
          title: "Chaos",
          description: "EP Album from TeZaTalks (2017)",
          imageUrl:
            "https://i1.sndcdn.com/artworks-000206265688-uxqrap-t500x500.jpg",
        },
        {
          userId: 1,
          title: "Fixion",
          description: "Album from The Oral Cigarettes",
          imageUrl:
          "https://i.scdn.co/image/ab67616d0000b273580e8939a6ac9f4ff00a99a8",
        },
        {
          userId: 3,
          title: "California 37",
          description: "Sixth Studio Album from Train (2012)",
          imageUrl:
            "https://m.media-amazon.com/images/I/71D0rd2R7mL._SS500_.jpg",
        },
        {
          userId: 1,
          title: "Worst in Me",
          description: "Single from Unlike Pluto",
          imageUrl:
            "https://pbs.twimg.com/media/C4pY86sXUAAoi5G.jpg",
        },
        {
          userId: 1,
          title: "Westworld Season Four SoundTrack",
          description: "Soundtrack from Season Four of HBO's Westworld",
          imageUrl:
          "https://i1.sndcdn.com/artworks-okjrAW6V7VCy-0-t500x500.jpg",
        },
        {
          userId: 1,
          title: "Ymir",
          description: "Self-Titled Album from Ymir (2021)",
          imageUrl:
            "https://themusicessentials.com/wp-content/uploads/2021/11/YMIR-TRIPWIRE-e1637638248565-696x503.jpg",
        },
        {
          userId: 1,
          title: "Issen",
          description: "Album by Sokoninaru (2019)",
          imageUrl:
            "https://m.media-amazon.com/images/I/61gu9lxQKGL._SL1000_.jpg",
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
     */
     options.tableName = 'Albums';
    return queryInterface.bulkDelete(options);
  },
};
