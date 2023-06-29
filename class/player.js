const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        const item = this.currentRoom.getItemByName(itemName);

        this.items.push(item);
        this.currentRoom.removeItem();
        // Fill this in
    }

    dropItem(itemName) {
        const item = this.getItemByName(itemName);
        let inventory = this.items;

        this.currentRoom.items.push(item);
        this.removeItem(itemName);
        // Fill this in
    }

    eatItem(itemName) {
        // Fill this in
        const item = this.getItemByName(itemName);

        if (item instanceof Food) {
            console.log(`You ate a ${item.name}!`);
            this.removeItem(itemName);
        }
    }

    getItemByName(name) {
        let result = this.items.reduce((accum, item) => {
            if (item.name === name) {
                return item;
            }

            return accum;
        });

        return result;
    }

    removeItem(itemName) {
        const item = this.getItemByName(itemName);
        const index = this.items.indexOf(item);
        this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
    }
}

module.exports = {
  Player
};
