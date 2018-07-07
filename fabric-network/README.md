# Kiwi Fabric Network Setup



## Generate crypto material command
./bin/cryptogen generate --config=./crypto-config.yaml

## Generate genesis block 
./bin/configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block

## Generate Channel tx
./bin/configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID kiwi-channel

## Update Peer Anchors for org1 and org2


# Starting the Network

'docker-compose -f docker-compose-cli.yaml up'


# Starting the Network

'docker-compose -f docker-compose-cli.yaml up'


## Devmode

### Setting up Channel

1. Get the channel.block from the network orderer

`peer channel create -o orderer.kiwi.com:7050 -c kiwi-channel -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/kiwi.com/orderers/orderer.kiwi.com/msp/tlscacerts/tlsca.kiwi.com-cert.pem`

2. Join the channel
`peer channel join -b kiwi-channel.block`

3. Add the other peer from Org2 to the channel
`CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.kiwi.com/users/Admin@org2.kiwi.com/msp CORE_PEER_ADDRESS=peer0.org2.kiwi.com:7051 CORE_PEER_LOCALMSPID="Org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.kiwi.com/peers/peer0.org2.kiwi.com/tls/ca.crt peer channel join -b kiwi-channel.block`

4. Add the rest of the peers by adjusting the numbers accordingly

5. Update anchor peers
    -  This command updates the anchor peer for org1.
    `peer channel update -o orderer.kiwi.com:7050 -c kiwi-channel -f ./channel-artifacts/Org1MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/kiwi.com/orderers/orderer.kiwi.com/msp/tlscacerts/tlsca.kiwi.com-cert.pem`
    - The second command updates the anchor peer for org2
    `CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.kiwi.com/users/Admin@org2.kiwi.com/msp CORE_PEER_ADDRESS=peer0.org2.kiwi.com:7051 CORE_PEER_LOCALMSPID="Org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.kiwi.com/peers/peer0.org2.kiwi.com/tls/ca.crt peer channel update -o orderer.kiwi.com:7050 -c kiwi-channel -f ./channel-artifacts/Org2MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/kiwi.com/orderers/orderer.kiwi.com/msp/tlscacerts/tlsca.kiwi.com-cert.pem`

