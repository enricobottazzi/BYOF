// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GM is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bool transferable = false;
    address public owner;


    modifier nonTrasferable {
        require (transferable = true, "this NFT is not transferable by design");
        _;
    }

    event MintedToken (address indexed _owner, uint indexed _tokenID);

    constructor() ERC721("GMList", "GM") {
        owner = msg.sender;
    }

    function awardItem(address _owner, string memory tokenURI)
        public
        returns (uint256)
    {
        // only the deployer of the contract can mint NFT
        require (msg.sender == owner, "you are not allowed to mint this NFT");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit MintedToken (_owner, newItemId);
        return newItemId;   
    }

    function updateTokenURI (uint256 _tknID, string memory _newtokenURI) public{
        address _owner = ownerOf(_tknID);
        require (msg.sender == _owner);
        _setTokenURI(_tknID, _newtokenURI);
    }

    function _transfer (address from, address to, uint256 tokenId) override internal nonTrasferable {
        // require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        // require(to != address(0), "ERC721: transfer to the zero address");

        // _beforeTokenTransfer(from, to, tokenId);

        // // Clear approvals from the previous owner
        // _approve(address(0), tokenId);

        // _balances[from] -= 1;
        // _balances[to] += 1;
        // _owners[tokenId] = to;

        // emit Transfer(from, to, tokenId);
    }
}