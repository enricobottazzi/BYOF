// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GM is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bool transferable = false;

    modifier nonTrasferable {
        require (transferable == true, "this NFT is not transferable by design");
        _;
    }

    event MintedToken (address indexed _owner, uint indexed _tokenID);

    constructor() ERC721("GMList", "GM") {}

    function awardItem(address _owner, string memory tokenURI)
        public
    {
        // only the _owner can mint NFT
        require (msg.sender == _owner, "you are not allowed to mint this NFT");
        // you can only have one NFT!
        require (balanceOf(_owner) == 0, "you already have a GANT NFT!");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit MintedToken (_owner, newItemId);
    }

    function updateTokenURI (uint256 _tknID, string memory _newtokenURI) public{
        address _owner = ownerOf(_tknID);
        require (msg.sender == _owner);
        _setTokenURI(_tknID, _newtokenURI);
    }

    function _transfer (address from, address to, uint256 tokenId) override internal nonTrasferable {
    }



}