import React from 'react';
import {View, StyleSheet} from 'react-native';
import StaffBanner from "./StaffBanner";
import CompanyManagersDashboard from "./CompanyManagersDashboard";
import CompanyEmployeeDashboard from "./CompanyEmployeeDashboard";


const CompanyStaffDashboard = () => {
    const [bannerPress, setBannerPress] = React.useState(false);

    return(
        <View>
            <View style={{paddingTop: 12 }}>
                <StaffBanner setBannerPress={setBannerPress} bannerPress={bannerPress}/>
            </View>
            <View>
                {bannerPress && <CompanyManagersDashboard />}
                {!bannerPress && <CompanyEmployeeDashboard />}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default CompanyStaffDashboard;
