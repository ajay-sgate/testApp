/* eslint-disable react-native/no-inline-styles */

import { ScrollView } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import c from '../../styles';

export default function HomeSkeleton() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {[{}, {}, {}, ].map((e: any, i: any) => {
                return (
                    <View key={i} style={[c.itemStyle, { borderTopWidth: i == 0 ? 1 : 0,height:180 }]}>
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item width={'100%'} flexDirection="row" alignItems="flex-start">
                                <SkeletonPlaceholder.Item width={38} height={38} alignItems={'flex-start'} borderRadius={10} />

                                <SkeletonPlaceholder.Item>

                                    <SkeletonPlaceholder.Item flexDirection='row' marginLeft={20} width={'100%'} marginTop={6}>
                                        <SkeletonPlaceholder.Item borderRadius={4} width={'20%'} height={25} />
                                        <SkeletonPlaceholder.Item marginLeft={10} borderRadius={4} width={'42%'} height={25} />
                                    </SkeletonPlaceholder.Item>

                                    <SkeletonPlaceholder.Item flexDirection='row' marginLeft={20} width={'100%'} marginTop={6}>
                                        <SkeletonPlaceholder.Item borderRadius={4} width={'45%'} height={25} />
                                        <SkeletonPlaceholder.Item marginLeft={10} borderRadius={4} width={'30%'} height={25} />
                                    </SkeletonPlaceholder.Item>

                                    <SkeletonPlaceholder.Item flexDirection='row' marginLeft={20} width={'100%'} marginTop={6}>
                                        <SkeletonPlaceholder.Item borderRadius={4} width={'75%'} height={25} />
                                        <SkeletonPlaceholder.Item borderRadius={2} marginLeft={10} width={20} height={25} />
                                    </SkeletonPlaceholder.Item>

                                    <SkeletonPlaceholder.Item flexDirection='row' marginLeft={20} marginTop={20} width={'90%'}>
                                        <SkeletonPlaceholder.Item  borderRadius={4} width={84} height={25} />
                                        <SkeletonPlaceholder.Item  borderRadius={4} marginLeft={8} width={84} height={25} />
                                        <SkeletonPlaceholder.Item  borderRadius={4} marginLeft={8} width={84} height={25} />
                                    </SkeletonPlaceholder.Item>

                                </SkeletonPlaceholder.Item>


                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                )
            })}
        </ScrollView >
    )
}