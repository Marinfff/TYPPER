import config from '../config/api.json'

class Api {
  static async loadAudio(): Promise<any> {
    return {
      main: (await import(`../${config.audio.main}`)).default,
      lose: (await import(`../${config.audio.lose}`)).default
    }
  }

  static async loadBackground(): Promise<any> {
    return (await import(`../${config.background}`)).default
  }

  static async loadStone(): Promise<any> {
    return (await import(`../${config.stone}`)).default
  }

  static async loadHero(): Promise<any> {
    return {
      sprites: {
        jump: (await import(`../${config.hero.sprites.jump}`)).default,
        run: (await import(`../${config.hero.sprites.run}`)).default
      },
      audio: (await import(`../${config.hero.audio}`)).default
    }
  }
}

export default Api
