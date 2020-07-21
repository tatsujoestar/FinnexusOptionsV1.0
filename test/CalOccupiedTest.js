const OptionsMangerV2 = artifacts.require("OptionsMangerV2");
const OptionsPool = artifacts.require("OptionsPool");
const ImpliedVolatility = artifacts.require("ImpliedVolatility");
const OptionsPrice = artifacts.require("OptionsPrice");
let FNXCoin = artifacts.require("FNXCoin");
let month = 30*60*60*24;
let collateral0 = "0x0000000000000000000000000000000000000000";

contract('OptionsMangerV2', function (accounts){
    it('OptionsMangerV2 add collateral', async function (){

        let OptionsManger = await OptionsMangerV2.deployed();
        let options = await OptionsPool.deployed();
//        let ivInstance = await ImpliedVolatility.at("0x54E8BB9dEC82B695C0Fa977070e74a06BE68001d");
//        let iv = await ivInstance.calculateIv(month,10000000000);
//        console.log(iv[0].toString(10),iv[1].toString(10))
//        let optionPrice = await OptionsPrice.deployed();
//        let temp = await optionPrice.getOptionsPrice_iv(20000000000,20000000000,month,iv[0],iv[1],0);
//        console.log(temp.toString(10))
        let fnx = await FNXCoin.deployed();
        let tx = await OptionsManger.addWhiteList(collateral0);
        tx = await OptionsManger.addWhiteList(fnx.address);
        await options.addUnderlyingAsset(1);
        await OptionsManger.addWhiteList(fnx.address); 
        await options.addExpiration(month);      
        for (var i=0;i<20;i++){
            for (var j=0;j<10;j++){
                OptionsManger.addCollateral(collateral0,1000000000000000,{value : 1000000000000000});

                OptionsManger.buyOption(collateral0,1000000000000000,9250*1e8,1,month,10000000000,0,{value : 1000000000000000});
        //        console.log(tx);
                OptionsManger.buyOption(collateral0,1000000000000000,9250*1e8,1,month,10000000000,0,{value : 1000000000000000});
        //        console.log(tx);
                OptionsManger.buyOption(collateral0,200000000000000,9250*1e8,1,month,10000000000,0,{value : 200000000000000});
        //        console.log(tx);
            }
            optionsLen = await options.getOptionInfoLength()
            for (j=0;j<Math.floor(optionsLen/500)+1;j++){
                let result =  await options.calculatePhaseOccupiedCollateral(j);
                console.log(result[0].toString(10),result[1].toString(10),result[2].toString(10),result[3].toString(10));
                let tx = await options.setPhaseOccupiedCollateral(j);
                console.log(tx);
//                let whiteList = [collateral0,fnx.address];
//                result =  await options.calculatePhaseSharedPayment(j,whiteList);
                //tx = await OptionsManger.setPhaseSharedPayment(j);
                //console.log(tx);
            }  
        }
     });
});