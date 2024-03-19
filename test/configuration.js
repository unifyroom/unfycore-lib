const chai = require('chai');
const Yescrypt = require('wasm-yescryptr32-hash');
const Hash = require('../lib/crypto/hash');
const crypto = require('crypto');

const { configure, BlockHeader } = require("../index");

const expect = chai.expect;

const headerBuffer = Buffer.from('0400000097ea9c8bee806143a8ae50116fe3d329dcbb18b5d8ea71a7a213a1b052000000b1950f668df2593684169b0e33ee7fb1b8e00d90ed906d80b4c2baa7d1b65f548f495a57ed98521d348b0700','hex')
describe('configuration', function () {
  before(async () => {
    const yescrypt = await Yescrypt();
    await configure({
      yescrypt: {
        digest: (input) => yescrypt.digest(input)
      },
      crypto: {
        createHash: () => ({
          update: () => ({
            digest: () => '00001111'
          })
        })
      }
    })
  });

  after(async () => {
    const yescrypt = await Yescrypt();
    await configure({
      yescrypt,
      crypto
    })
  })

  it('should use external yescrypt for block header hash', () => {
    const blockHeader = new BlockHeader(headerBuffer);
    expect(blockHeader.hash).to.equal('15f647fc7cbe1016fcc342a25ad38f02d3af53c1a25ee82e3568f8646040021b')
  })

  it('should use external crypto module', () => {
    const hash = Hash.sha512(Buffer.alloc(32));
    expect(hash).to.equal('00001111')
  })
});
