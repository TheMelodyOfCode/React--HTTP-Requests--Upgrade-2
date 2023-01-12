# REACT-HTTP-Requests - Upgrade - 2  
### REACT & Firebase

#### Upgrade
> This is an upgrade to my series of React-HTTP-Requests projects  
> here we have a generic useAsync hook for handling any asynchronous logic for our app  
> useCallback for memoization  
> return memoized run function  
> safeDispatch in case of api call although the component has already unmounted
> - this happens when a user makes an api call and while pending, navigates away
  
> **General functionality:**
>> to recieve a trading-card from db when enter the name in the form field or click the  designeted button    
>> to show a list of previous chosen trading-cards    
>> mounting/unmounting the app when un/-checking the checkbox  

> Hooks used in this exercise:  
>> useState</br>
>> useEffect</br>
>> useRef</br>
>> useReducer</br>
>> useContext</br>
>> useCallback</br>

#### useState vs. useReducer
> - When it's just an independent element of state you're managing:   useState  
> - When one element of your state relies on the value of another element of your state in order to update:   useReducer  

#### Firebase
> In the Utils Folder, you will find all files related to Firebase</br>
>> There is a tradingCards_DATA.js file for Firestore db in case you want to create your own.</br>
>> The current configuration in the firebase.utils file works though.</br>

#### React APP
> Run the app from the main folder - npm start</br>
> Will run on localhost:3000</br>

#### Credit
> I can't stress this enough, all I learned in this exercise was from this guy:  
> - **Kent C. Dodds**  
> You can find more information about Epic-React here:</br> 
> - https://epicreact.dev/</br>
