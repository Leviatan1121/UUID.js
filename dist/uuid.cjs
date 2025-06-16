class UUID {
    static CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static FIRST_CHAR = "0";
    static LAST_CHAR = "z";
    last_uuid = null;
    current_uuids = 0;
    unused_uuids_count = 0;
    unused_uuids = [];
    ordered_unused_uuids = true;
    reuse_by_default = true;
    limit = false;
    constructor(chars = UUID.CHARSET) {
        this.CHARSET = chars;
        this.FIRST_CHAR = chars[0];
        this.LAST_CHAR = chars[chars.length - 1];
    }
    /**
     * @param {string} uuid
     * @param {boolean|null} [reuse=null]
     * @returns {string|false}
     */
    generate(uuid = this.last_uuid, reuse = null) {
        if (this.limit && this.current_uuids > this.limit - 1) return false;

        this.current_uuids++;

        if ((reuse || (reuse === null && this.reuse_by_default)) && this.unused_uuids_count > 0) {
            this.unused_uuids_count--;
            return this.unused_uuids.shift();
        } else if (!uuid) {
            this.last_uuid = this.FIRST_CHAR;
            return this.FIRST_CHAR;
        }

        const UUID_LENGTH = uuid.length;
        let i = UUID_LENGTH - 1;
        // where we need to increment
        while (i >= 0 && uuid[i] === this.LAST_CHAR) i--;

        // UUID creation
        this.last_uuid = (i < 0)
            ? this.FIRST_CHAR.repeat(UUID_LENGTH + 1)
            : uuid.substring(0, i)
            + this.CHARSET[this.CHARSET.indexOf(uuid[i]) + 1] // next char
            + this.FIRST_CHAR.repeat(UUID_LENGTH - i - 1); // rest of chars
        return this.last_uuid;
    }
    reuse(uuid) {
        if (typeof uuid !== 'string' || uuid.trim() === '' || this.unused_uuids.includes(uuid)) return;

        if (!this.ordered_unused_uuids || this.unused_uuids_count === 0) {
            this.unused_uuids.push(uuid);
            this.unused_uuids_count++;
            if (this.current_uuids > 0) this.current_uuids--;
            return;
        }

        let left = 0;
        let right = this.unused_uuids_count - 1;
        let insert_index = this.unused_uuids_count;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.compare(uuid, this.unused_uuids[mid]) > 0) {
                left = mid + 1;
            } else {
                insert_index = mid;
                right = mid - 1;
            }
        }

        this.unused_uuids.splice(insert_index, 0, uuid);
        this.unused_uuids_count++;
        if (this.current_uuids > 0) this.current_uuids--;
    }
    compare(a, b) {
        const a_length = a.length;
        const b_length = b.length;
        if (a_length < b_length) return -1;
        if (a_length > b_length) return 1;
        for (let i = 0; i < a_length; i++) {
            const a_index = this.CHARSET.indexOf(a.charAt(i));
            const b_index = this.CHARSET.indexOf(b.charAt(i));
            if (a_index < b_index) return -1;
            else if (a_index > b_index) return 1;
        }
        return 0;
    }
    reset() {
        this.last_uuid = null;
        this.current_uuids = 0;
        this.unused_uuids_count = 0;
        this.unused_uuids.length = 0;
        this.ordered_unused_uuids = true;
        this.reuse_by_default = true;
        this.limit = false;
    }
}

module.exports = UUID