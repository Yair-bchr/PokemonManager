export class Pokemon{
    constructor(name, abilities, moves, height, characteristic, image ){
        this.name = name;
        this.abilities = abilities;//each pokemon can have up to 2 abilities
        this.moves = moves;//each pokemon has 4 moves
        this.height = height;
        this.characteristic = characteristic;
        this.image = image;
    }

    getValues(){
        return new this.constructor(this.name, this.abilities.slice(0, 4).map((a) => a.ability.name), this.moves.slice(0, 4).map((m) => m.move.name), this.height, this.characteristic.descriptions[7].description, this.image);
    }

    static async randPokemons(){
        const fetchPromises = Array.from({ length: 30 }, () => this.randPokemon());
        const results = await Promise.all(fetchPromises);
        return results;
    }

    static async randPokemon(){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.getRndInteger(1, 1025)}/`);
        const {name, abilities, moves, height, sprites, ...rest} = await response.json();
        const characteristic = await this.randCharacteristic();
        return new this(name, abilities, moves, height, characteristic, sprites["front_default"]);
    }

    static async randCharacteristic(){
        let response = await fetch(`https://pokeapi.co/api/v2/characteristic/${this.getRndInteger(1, 30)}/`)
        return await response.json();
    }

    static async getPokemon(i){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        return await response.json();
    }

    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    static async getAllNames(){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
        return await response.json();
    }
}