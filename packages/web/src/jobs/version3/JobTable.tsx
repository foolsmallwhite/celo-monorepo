import * as React from 'react'
import { SectionList, StyleSheet } from 'src/shared/core'
import Fade from 'react-reveal/Fade'
import { I18nProps, withNamespaces } from 'src/i18n'
import { groupByTeam, LeverJob, sortJobs } from 'src/jobs/lever'
import { JobRow, MobileJobRow } from 'src/jobs/version3/JobRows'
import { ScreenProps, ScreenSizes, withScreenSize } from 'src/layout/ScreenSize'
import { NoneFound, SectionHeader } from 'src/table/table'

interface OwnProps {
  positions: LeverJob[]
  clearAll: () => void
}

class JobsTable extends React.Component<OwnProps & ScreenProps> {
  getSections = () => {
    const departments = groupByTeam(this.props.positions)
    return Object.keys(departments).map((key) => {
      return { title: key, data: sortJobs(departments[key]) }
    })
  }

  renderNoJobs = () => {
    return <NoJobs onPress={this.props.clearAll} />
  }

  renderItem = ({ item }: { item: LeverJob }) => {
    if (this.props.screen === ScreenSizes.MOBILE) {
      return (
        <Fade bottom={true} distance="20px">
          <MobileJobRow {...item} key={item.id} />
        </Fade>
      )
    }
    return (
      <Fade bottom={true} distance="20px">
        <JobRow {...item} key={item.id} screen={this.props.screen} />
      </Fade>
    )
  }

  render = () => {
    return (
      <SectionList
        sections={this.getSections()}
        renderSectionHeader={SectionHeader}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={this.renderNoJobs}
        contentContainerStyle={styles.container}
      />
    )
  }
}

function keyExtractor(item: LeverJob) {
  return item.id
}

interface NoJobProps {
  onPress: () => void
}

const NoJobs = withNamespaces('jobs')(function NoJobsComponent({
  t,
  onPress,
}: I18nProps & NoJobProps) {
  return <NoneFound onPress={onPress} longText={t('')} actionText={t('')} />
})

export default withScreenSize(JobsTable)

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
})
