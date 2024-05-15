export class Pokemon{
    constructor(name, abilities, moves, height, characteristic, image ){
        this.name = name;
        this.abilities = abilities;
        this.moves = moves;
        this.height = height;
        this.characteristic = characteristic
        this.image = image;
    }

    static async randPokemons(){
        const fetchPromises = Array.from({ length: 30 }, () => this.randPokemon());
        const results = await Promise.all(fetchPromises);
        return results;
    }

    static async randPokemon(){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.getRndInteger(1, 1025)}/`);
        const {name, abilities, moves, height, sprites, ...rest} = await response.json();

        response = await fetch(`https://pokeapi.co/api/v2/characteristic/${this.getRndInteger(1, 30)}/`)
        const characteristic = await response.json();
        
        return new this(name, abilities, moves, height, characteristic.descriptions[7], sprites["front_default"]);
    }

    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

}