class UUID {
    charSet = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    totalUsed = 0
    totalUnused = 0
    currentPosition = 0;
    currentUUIDLength = 1;
    unusedUUIDs = [];
    limit = false

    newUUID() {
        if (this.limit && this.totalUsed === this.limit) return false;

        this.totalUsed++

        if (this.totalUnused > 0) {
            this.totalUnused--
            return this.unusedUUIDs.shift();
        }

        if (this.currentPosition >= this.charSet.length ** this.currentUUIDLength) {
            this.currentUUIDLength++;
            this.currentPosition = 0;
        }

        const newUUID = this.getNewUUID();
        this.currentPosition++;
        return newUUID.toString();
    }

    getNewUUID() {
        let index = this.currentPosition;
        let newUUID = "";

        for (let i = 0; i < this.currentUUIDLength; i++) {
            newUUID = this.charSet[index % this.charSet.length] + newUUID;
            index = Math.floor(index / this.charSet.length);
        }

        return newUUID;
    }

    reuse(uuid) {
        if (this.unusedUUIDs.includes(uuid)) return;

        if (this.totalUnused < 1) {
            this.unusedUUIDs.push(uuid);
            this.totalUsed--
            this.totalUnused++
            return
        }

        for (let insertIndex = 0; insertIndex < this.unusedUUIDs.length; insertIndex++) {
            if (this.compareCharSet(uuid, this.unusedUUIDs[insertIndex]) <= 0) {
                this.unusedUUIDs.splice(insertIndex, 0, uuid);
                this.totalUsed--
                this.totalUnused++
                return;
            }
        }
    }

    compareCharSet(a, b) {
        const aLength = a.length;
        const bLength = b.length;

        if (aLength < bLength) {
            return -1;
        } else if (aLength > bLength) {
            return 1;
        }

        for (let i = 0; i < aLength; i++) {
            const aChar = a.charAt(i);
            const bChar = b.charAt(i);

            const aIndex = this.charSet.indexOf(aChar);
            const bIndex = this.charSet.indexOf(bChar);

            if (aIndex < bIndex) {
                return -1;
            } else if (aIndex > bIndex) {
                return 1;
            }
        }

        return 0;
    }
}

module.exports = UUID