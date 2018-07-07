# Kiwi Fabric Network Setup

## Generate crypto material command
./bin/cryptogen generate --config=./crypto-config.yaml

## Generate genesis block 
./bin/configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block

## Generate Channel tx
./bin/configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $kiwi-channel

## Update Peer Anchors for org1 and org2


# Starting the Network

'docker-compose -f docker-compose-cli.yaml up'

