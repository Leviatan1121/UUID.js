import UUID from "./dist/uuid.mjs";

// Test cases
console.log("🧪 Running UUID.js tests...\n");

// Test 1: Basic UUID generation
console.log("📌 Test 1: Basic UUID generation");
const uuid = new UUID();
console.assert(uuid.generate() === "0", "First UUID should be '0'");
console.assert(uuid.generate() === "1", "Second UUID should be '1'");
console.assert(uuid.generate() === "2", "Third UUID should be '2'");
console.assert(uuid.generate("9") === "A", "After 9 should be A");
console.assert(uuid.generate("z") === "00", "After z should be 00");
console.assert(uuid.generate("99") === "9A", "Should handle multiple digits");
console.assert(uuid.generate("zz") === "000", "Should handle multiple z's");
console.log("✅ Basic generation works!\n");

// Test 2: Custom character set
console.log("📌 Test 2: Custom character set (binary)");
const binary = new UUID('01');
console.assert(binary.generate() === "0", "First binary UUID should be '0'");
console.assert(binary.generate() === "1", "Second binary UUID should be '1'");
console.assert(binary.generate() === "00", "Third binary UUID should be '00'");
console.assert(binary.generate("1") === "00", "After 1 should be 00 in binary");
console.assert(binary.generate("11") === "000", "Should handle multiple 1's in binary");

const hex = new UUID('0123456789ABCDEF');
console.assert(hex.generate() === "0", "First hex UUID should be '0'");
console.assert(hex.generate("9") === "A", "After 9 should be A in hex");
console.assert(hex.generate("F") === "00", "After F should be 00 in hex");
console.log("✅ Custom character set works!\n");

// Test 3: UUID recycling
console.log("📌 Test 3: UUID recycling");
const recycler = new UUID();
recycler.generate(); // "0"
recycler.generate(); // "1"
recycler.reuse("0");
console.assert(recycler.unused_uuids_count === 1, "Should have one recycled UUID");
console.assert(recycler.generate() === "0", "Should reuse recycled UUID");
console.assert(recycler.generate() === "2", "Should continue sequence after reuse");


function debug() {
    console.log('\n----------------------');
    console.log(`current_uuids:`, recycler.current_uuids);
    console.log(`last_uuid: "${recycler.last_uuid}"`);
    console.log(`unused_uuids:`, recycler.unused_uuids);
    console.log(`unused_uuids_count:`, recycler.unused_uuids_count);
    console.log('----------------------\n');
}

//! TODO: Fix this test
// Test recycling with force new
recycler.reuse("1");

debug();
let test_uuid = recycler.generate(null, false); // should be "1"
console.log(test_uuid); //* ok
debug();
process.exit(0);

process.exit(0);

let new_uuid = recycler.generate(null, false);
console.log(new_uuid);
console.assert(new_uuid === "3", "Should force new UUID when specified");
console.assert(recycler.generate(null, true) === "1", "Should force reuse when specified");
console.log("✅ Recycling works!\n");

process.exit(0);


// Test 4: Ordered vs Unordered recycling
console.log("📌 Test 4: Ordered vs Unordered recycling");
const ordered = new UUID();
ordered.generate(); // "0"
ordered.generate(); // "1"
ordered.generate(); // "2"
ordered.reuse("1");
ordered.reuse("0");
console.assert(ordered.generate() === "0", "Should reuse in order");
console.assert(ordered.generate() === "1", "Should reuse in order");

const unordered = new UUID();
unordered.ordered_unused_uuids = false;
unordered.generate(); // "0"
unordered.generate(); // "1"
unordered.generate(); // "2"
unordered.reuse("1");
unordered.reuse("0");
console.assert(unordered.generate() === "1", "Should reuse last recycled in unordered mode");
console.assert(unordered.generate() === "0", "Should reuse first recycled in unordered mode");
console.log("✅ Ordered/Unordered recycling works!\n");

// Test 5: UUID comparison
console.log("📌 Test 5: UUID comparison");
const comparer = new UUID();
console.assert(comparer.compare("A", "B") === -1, "A should be less than B");
console.assert(comparer.compare("B", "A") === 1, "B should be greater than A");
console.assert(comparer.compare("A", "A") === 0, "A should equal A");
console.assert(comparer.compare("A", "AA") === -1, "A should be less than AA");
console.assert(comparer.compare("AA", "A") === 1, "AA should be greater than A");
console.assert(comparer.compare("9", "A") === -1, "9 should be less than A");
console.assert(comparer.compare("z", "00") === -1, "z should be less than 00");
console.log("✅ Comparison works!\n");

// Test 6: Reset functionality
console.log("📌 Test 6: Reset functionality");
const reseter = new UUID();
reseter.generate(); // "0"
reseter.generate(); // "1"
reseter.reuse("0");
reseter.reset();
console.assert(reseter.current_uuids === 0, "Current UUIDs should be 0 after reset");
console.assert(reseter.unused_uuids_count === 0, "Unused UUIDs should be 0 after reset");
console.assert(reseter.generate() === "0", "Should start from beginning after reset");
console.assert(reseter.ordered_unused_uuids === true, "Should reset ordered_unused_uuids");
console.assert(reseter.reuse_by_default === true, "Should reset reuse_by_default");
console.assert(reseter.limit === false, "Should reset limit");
console.log("✅ Reset works!\n");

// Test 7: Limit functionality
console.log("📌 Test 7: Limit functionality");
const limiter = new UUID();
limiter.limit = 2;
console.assert(limiter.generate() === "0", "First UUID should be '0'");
console.assert(limiter.generate() === "1", "Second UUID should be '1'");
console.assert(limiter.generate() === false, "Should return false when limit reached");
limiter.reuse("0");
console.assert(limiter.generate() === "0", "Should still reuse below limit");
console.assert(limiter.generate() === false, "Should still respect limit after reuse");
console.log("✅ Limit works!\n");

console.log("🎉 All tests passed successfully!");
;;
