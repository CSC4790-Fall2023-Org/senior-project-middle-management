import React from 'react';
import {View, StyleSheet} from 'react-native';
import StaffBanner from "./StaffBanner";
import CustomButton from "../CustomButton";
import CompanyManagersDashboard from "./CompanyManagersDashboard";


const CompanyStaffDashboard = () => {
    const [bannerPress, setBannerPress] = React.useState(false);

    return(
        <View>
            <View style={{paddingTop:10 }}>
                <StaffBanner setBannerPress={setBannerPress} bannerPress={bannerPress}/>
            </View>
            <View>
                <CompanyManagersDashboard/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

});
export default CompanyStaffDashboard;