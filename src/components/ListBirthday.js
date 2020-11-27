import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, View, ScrollView } from 'react-native'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'
import Birthday from './Birthday'
import firebase from '../utils/firebase'
import "firebase/firestore"
import moment from 'moment';

firebase.firestore().settings({experimentalForceLongPolling: true})
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {
    
    const {user} = props;

    const [showList, setShowList] = useState(true)
    const [birthday, setBirthday] = useState([])
    const [pasatBirth, setPasatBirth] = useState([])
    const [reload, setReload] = useState(false)

    const deleteBirthDay = (birthday) => {
        Alert.alert('Eliminar cumpleaños', 
        `¿Estás seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.surname} ?`,
        [
            {
                text: "Cancelar",
                style: 'cancel'
            },
            {
                text: "Eliminar",
                onPress: () => {
                    db.collection(user.uid).doc(birthday.id).delete().then( () => {
                        setReload(!reload);
                    })
                }
            }
        ],
        {cancelable: false}
        )
    }

    useEffect(() => {
        setBirthday([]);
        setPasatBirth([]);
        db.collection(user.uid).orderBy("dateBirth", "asc").get().then( res => {
            const itemsArray = [];
            res.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                itemsArray.push(data);
            });
            formatData(itemsArray)
        })
    }, [reload])

    const formatData = (items) => {
        const currentDate = moment().set({hour:0, minute: 0, seconds: 0, milliseconds: 0})
        const birthdayTempArray = [];
        const pasatBirthTempArray = [];

        items.forEach( item => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000);
            const dateBirthDay = moment(dateBirth);
            const currentYear = moment().get("year");

            dateBirthDay.set({year: currentYear})
            const diffDate = currentDate.diff(dateBirthDay, "days");

            const itemTemp = item;
            itemTemp.dateBirth = dateBirthDay;
            itemTemp.days = diffDate;

            if (diffDate <= 0) {
                birthdayTempArray.push(itemTemp)
            } else {
                pasatBirthTempArray.push(itemTemp)
            }

        })

        setBirthday(birthdayTempArray)
        setPasatBirth(pasatBirthTempArray)
    }

    return (
        <View style={styles.container}>
            {
            showList ?
                <>
                    <ScrollView style={styles.scrollView}>
                        {
                            birthday.map( (item, idx) => (
                                <Birthday deleteBirthDay={deleteBirthDay} key={idx} birthday={item} />
                            ))
                        }
                        {
                            pasatBirth.map( (item, idx) => (
                                <Birthday deleteBirthDay={deleteBirthDay} key={idx} birthday={item} />
                            ))
                        }
                    </ScrollView>
                </>
                :
                <AddBirthday setReload={setReload} reload={reload} setShowList={setShowList} user={user}/>
            }
            
            <ActionBar showList={showList} setShowList={setShowList}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%"
    },
    scrollView: {
        marginBottom: 50,
        width: "100%",
    }
})
