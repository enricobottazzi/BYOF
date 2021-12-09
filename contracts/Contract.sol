//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract GangManager {
    uint256 counter;

    struct Account {
        address owner;
        string[] gang;
    }

    mapping(uint256 => Account) accountId;

    event newGang(address _address, uint256 _uint);

    function createManager() external {
        counter++;
        emit newGang(msg.sender, counter);
        accountId[counter].owner = msg.sender;
    }

    function addMember(string calldata _address, uint256 _id) external {
        require(accountId[_id].owner == msg.sender, "Function not called by owner");
        accountId[_id].gang.push(_address);
    }

    function retrieveGang(uint256 _id) external view returns(string[] memory){
        require(accountId[_id].owner == msg.sender, "Function not called by owner");
        return accountId[_id].gang;
    }
}