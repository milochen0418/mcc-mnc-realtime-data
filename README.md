# mcc-mnc-realtime-data
The service to get realtime data in json format from international website Mobile Country Codes (MCC) and Mobile Network Codes (MNC)  

Mobile Country Codes (MCC) are used in wireless telephone networks (GSM, CDMA, UMTS, etc.) in order to identify the country which a mobile subscriber belongs to. In order to uniquely identify a mobile subscribers network the MCC is combined with a Mobile Network Code (MNC). The combination of MCC and MNC is called HNI (Home network identity) and is the combination of both in one string (e.g. MCC= 262 and MNC = 01 results in an HNI of 26201). If you combine the HNI with the MSIN (Mobile Subscriber Identification Number) the result is the so called IMSI (integrated mobile subscriber identify). Below you can browse/search the list of countries and their MCCs for free in order to identify any MCC, MNC or HNI of the world.  

Mcc-mnc.com is a service by [SMScarrier.EU](http://www.smscarrier.eu/en) and powered by [interactive digital media GmbH](http://www.i-digital-m.com/)

**MCC - Mobile Country Code**  
This is the country code. It always has 3 digits. Some countries can use more than one MCC.  

**MNC - Mobile Network Code**  
This is the network code. It can have 2 or 3 digits.  

**MCCMNC - PLMN Number.**   
MCC + MNC  

# Install and Execution
## Install
At the First, you need to have nodeJS environment.   
Secondly, you should use the following command to install dependent modules.  
<code>
$ npm install      
</code>   
Finally, your environment is ready for executing. 

## Execution  
The way to run the server  

<code>  
$ npm start   
</code>  
