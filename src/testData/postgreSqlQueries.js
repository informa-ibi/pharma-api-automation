const commonQuery = {
  drug: `with HD as
  (
      select distinct *
      from (
          select
              drugkey,
              year,
              worldstatus,
              class,
              rank() over (partition by drugkey order by year desc) as rankId
          from drugs.history_drug hd
      ) s where s.rankId = 1
  ),
  PLS as (
      select distinct *
      from (
          select distinct 
              a.drug_id,
              a.company_id,
              a.current_dev_status_id,
              RANK() over (partition by a.drug_id, a.company_id order by c.programme_status_rank desc) as rankId
          from drugs.program_landscape_status a join drugs.drug_global_status c on c.id = a.current_dev_status_id
          where company_type = 'Originator'
      ) i where i.rankId = 1
  )
  select distinct on (d.drug_key)
      d.drug_key as id,
      d.drug_key as drugid,
      dn.name as DrugPrimaryName,
      d.summary as Overview,
      m.approvals as Marketing,
      l.agreement as Licensing,
      p.phase1 as phaseI,
      p.phase2 as phaseII,
      p.phase3 as phaseIII,
      p.preclinical_invivo as PreClinical,
      dgs.status as GlobalStatus,
      comp1.name as OriginatorName,
      dgs2.status as originatorStatus,
      case HD.class
          when 'A' then 'Active'
          when 'L' then 'Widely Launched'
          when 'D' then 'Ceased'
          else COALESCE(cl.class_name, 'Active')
      end as DevelopmentStatus,
      comp1.id as OriginatorCompanyKey,
      case co.country_name
          when 'Macao' then 'Macao, S.A.R., China'
          when 'Hong Kong' then 'Hong Kong, S.A.R., China'
          when 'Taiwan' then 'Taiwan, China'
          else co.country_name
      end as OriginatorCountry,
      d.latest_change_date as LatestChangeDate,
      d.latest_change_text as LatestChange,
      d.modified_date as UpdatedDate,
      oom.description as Origin,
      case
          when cs.chemical_name = '' then null
          else cs.chemical_name
      end as ChemicalName,
      case
          when cs.weight  = '' then null
          else cast(cs.weight as decimal)
      end as MolecularWeight,
      case when cs.nce = true then 1 else 0 end as NCE,
      case
          when comp1.start_of_path = comp1.id then null
          else comp1.start_of_path
      end as OriginatorParentKey,
      case
          when comp2."name" = comp1."name" then null
          else comp2."name"
      end as OriginatorParentName,
      NULLIF(cs.formula, '') as MolecularFormula,
      case when d.drug_type_id = 4 then false else true end as IsPharmaProjectsDrug,
      case
          when d.prod_status = 5 then 'ClinicalTrials.gov'
          else 'NonClinicalTrials.gov'
      end as DrugSource
  from drugs.drug d
      join drugs.drug_name dn on (case when d.parent_id is null then d.id else d.parent_id end) = dn.drug_id and is_primary = True
      left join PLS as pls on pls.drug_id = dn.drug_id
      left join company.vw_company comp1 on pls.company_id = comp1.id
      left join drugs.marketing m on d.marketing_id = m.id
      left join drugs.license l on l.id = d.license_id
      left join drugs.phases p on p.id = d.phase_id
      left join drugs.drug_global_status dgs on d.global_status = dgs.id
      left join drugs.drug_global_status dgs2 on dgs2.id = PLS.current_dev_status_id
      left join HD on d.drug_key = HD.drugkey
      left join drugs.class as cl on HD.class = cl.class
      left join company.company comp2 on comp2.id = comp1.start_of_path
      left join drugs.country co on co.id = comp1.country_id
      left join drugs.chem_structure cs on cs.id = d.chemical_id
      left join drugs.origin_of_material oom on cs.origin_id = oom.id
  where d.prod_status in (1, 4, 5)
      and dn.name is not null
      and d.parent_Id is null`,
  trial: `select
  ct.id,
  ct.name as TrialTitle,
  tgs.status as TrialStatus,
  coalesce(ct.start_date_actual, ct.start_date_target) as TrialStartDate,
  case
      when ct.start_date_actual is not null then 'Actual'
      when ct.start_date_target is not null then 'Anticipated'
      else null
  end as TrialStartDateType,
  case
      when ct.enrollment_duration_actual is not null then 'Actual'
      when ct.enrollment_duration_target is not null then 'Anticipated'
      else null
  end as TrialEnrollmentDurationType,
  coalesce(ct.enrollment_close_date_actual, ct.enrollment_close_date_target) as TrialCloseDate,
  case
      when ct.enrollment_close_date_actual is not null then 'Actual'
      when ct.enrollment_close_date_target is not null then 'Anticipated'
      else null
  end as TrialCloseDateType,
  coalesce(ct.treatment_duration_actual, ct.treatment_duration_target) as TrialTreatmentDuration,
  case
      when ct.treatment_duration_actual is not null then 'Actual'
      when ct.treatment_duration_target is not null then 'Anticipated'
      else null
  end as TrialTreatmentDurationType,
  coalesce(ct.primary_completion_date_actual, ct.primary_completion_date_target) as TrialPrimaryCompletionDate,
  case
      when ct.primary_completion_date_actual is not null then 'Actual'
      when ct.primary_completion_date_target is not null then 'Anticipated'
      else null
  end as TrialPrimaryCompletionDateType,
  ct.terminated_date as TrialEndDate,
  coalesce(ct.primary_endpoints_reported_actual, ct.primary_endpoints_reported_target) as TrialPrimaryEndpointsReported,
  case
      when ct.primary_endpoints_reported_actual is not null then 'Actual'
      when ct.primary_endpoints_reported_target is not null then 'Anticipated'
      else null
  end as TrialPrimaryEndpointsReportedType,
  ct.last_full_review_date as TrialLastReviewDate,
  coalesce(ct.modified_date, ct.created_date) as TrialLastModifiedDate,
  ctpp.target_accrual as TrialTargetAccrual,
  ctpp.target_accrual_comment as TrialTargetAccrualText,
  ctpp.actual_accrual as TrialActualAccrual,
  ctpp.interim_accrual_comment as TrialActualAccrualText,
  null as TrialInvestigatorContacts,
  ct.created_date as TrialRecordCreated,
  case ct.production_status_id
      when 1 then 'Trialtrove' 
      when 4 then 'Trialtrove' 
      when 5 then 'Registry Only'
      else 'Unknown'
  end as TrialRecordType
from trials.clinical_trials ct
  left join trials.trial_global_status tgs on tgs.id = ct.global_status_id
  left join trials.trial_source ts on ts.id = ct.source_id
  left join trials.clinical_trials_patient_population ctpp on ctpp.clinicaltrial_id = ct.id
where ct.production_status_id IN (1, 4, 5)`,
  organization: `SELECT Id, OrganizationName, OrganizationType, UpdatedDate
from organization.vw_organizations 
where Id != 45559`,
  investigator: `SELECT
Id,
InvestigatorFirstName,
InvestigatorLastName,
InvestigatorMiddleInitial,
UpdatedDate
from person.vw_investigators`,
  drugCompany: `select distinct
c.id as Id,
c.id as CompanyId,
c."name" as CompanyName,
c.established_year as YearEstablished,
ot.ownership_type as OwnershipType,
se.exchange as CompanyStockExchange,
case 
    when c.stock_symbol = '' then null
    else c.stock_symbol
end as CompanySymbol,
c.summary as CompanySummary,
(
    select jsonb_array_elements_text(c2.website)
    from company.company c2
    where c2.id = c.id
    limit 1
) as CompanyWebsite,
cfe.no_of_employees as CompanyEmployees,
rf.description as ResearchFocus,
c.parent_id as ParentCompanyId,
c.year_acquired as YearAcquired,
case cn.country_name 
    when 'Macao' then 'Macao, S.A.R., China'
    when 'Hong Kong' then 'Hong Kong, S.A.R., China'
    when 'Taiwan' then 'Taiwan, China'
    else cn.country_name
end as Country
from company.company c
left join drugs.ownership_type ot on ot.id = c.type_id
left join company.stock_exchange se on se.id = c.stock_exchange_id
left join company.research_focus rf on rf.id = c.research_focus_id
left join drugs.country cn on cn.id = c.country_id
left join (
    select distinct on (company_id) company_id, no_of_employees
    from company.company_financial_entry
    where no_of_employees is not null
    order by company_id, financial_year_end desc
) cfe on cfe.company_id = c.id
where c.prod_status_id in (1, 4, 5)`,
  drugProgram: `select distinct on (a.id)
a.id,
drug_key as drugid,
y.name as DrugPrimaryName,
k.status as globalstatus,
case cl.class
    when 'A' then 'Active'
    when 'L' then 'Widely Launched'
    when 'D' then 'Ceased'
    else COALESCE(cl.class_name, 'Active')
end as HighestDevelopmentStatus,
country_key as countrycode,
case d.country_name
    when 'Macao' then 'Macao, S.A.R., China'
    when 'Hong Kong' then 'Hong Kong, S.A.R., China'
    when 'Taiwan' then 'Taiwan, China'
    else d.country_name 
end  as CountryName,
e.indication as diseasename,
company_type as CompanyRelationship,
a.company_id as Companyid,
x.name as companyname,
comp2.id as ParentCompanyId,
case
    when c.id in (10,6,7,8,9) then 'Active'
    when c.id in (3,11) then 'Widely Launched'
    when c.id in (4,12,2,13) then 'Ceased'
end as CurrentDevelopmentStatus,
c.status as CurrentStatus,
g.status as HighestStatusReached,
launch_year as YearLaunch,
b.modified_date as UpdatedDate
from drugs.program_landscape_status a
join drugs.drug b on a.drug_id = b.id
join drugs.class as cl on cl.id = b.dev_status
join drugs.drug_global_status c on c.id = a.current_dev_status_id
join drugs.drug_global_status g on g.id = a.high_dev_status_id
join drugs.drug_global_status k on k.id = b.global_status
join drugs.country d on d.id = a.country_id
join drugs.country_group_association f on f.country_id = d.id
join drugs.indication e on e.id = a.disease_id
join company.vw_company x on x.id = a.company_id
join company.company_status cs on cs.id = x.company_type_id
join company.company Comp2 on Comp2.id = x.start_of_path
join drugs.drug_name y on y.drug_id = a.drug_id and is_primary = True
where b.prod_status in (1,4)`,
  drugTrends: `select distinct on (d.drug_key)
d.drug_key as id,
d.drug_key as drugid,
name as drugprimaryname
from drugs.history_drug hd
join  drugs.drug d on d.drug_key=hd.drugkey
join drugs.drug_name e on e.drug_id=d.id
where parent_id is null and is_primary='True'`,
  organizationHierarchy: `select distinct
x.Id as Id,
x.Id as OrganizationId,
x.OrganizationName as OrganizationName,
y.parent_id as ParentOrganizationId,
y.updatedDate as UpdatedDate
from (
    select
        a.id,
        name as OrganizationName,
        COALESCE(organization_type, 'N/A') as OrganizationType,
        a.modified_date as updatedDate
    from organization.organization a
        join organization.organization_type b on a.type_id=b.id
    where b.id not in (10,21) and prod_status_id in (1, 4, 5)
union
    select
        a.id,
        a.name as OrganizationName,
        COALESCE(organization_type, 'N/A') as OrganizationType,
        a.modified_date as updatedDate
    from organization.organization a
        join organization.organization_type b on a.type_id = b.id and b.id not in (10,21) and prod_status_id IN (1, 4, 5)
        join person.person d on d.parent_organization_id = a.id
        join (
            select a.id
        from person.person a
            join trials.clinical_trials_contact b on a.id = b.person_id
            join organization.organization c on c.id = b.organization_id and c.type_id not in (10,21) and c.prod_status_id IN (1,4,5)
            join trials.clinical_trials d on d.id = b.clinicaltrial_id and production_status_id in (1,4)
        where a.id <> 101990 and a.prod_status_id in (1,4,5) and a.type_id = 3
        ) as uniquepeople on uniquepeople.id = d.id
union
    select
        a.id,
        a.name as OrganizationName,
        COALESCE(organization_type, 'N/A') as OrganizationType,
        a.modified_date as updatedDate
    from organization.organization a
        join organization.organization_type b on a.type_id = b.id
    where b.id not in (10,21) and prod_status_id IN (1, 4, 5) and
        a.id in (select parent_id from organization.organization)
) x
inner join (
    select a.id, a.parent_id, a.modified_date as updatedDate
    from organization.organization a
        inner join (
                select distinct parent_id
        from organization.organization
        where parent_id is not null
            ) as ab on a.id = ab.parent_id
    where type_id not in (10,21) and prod_status_id in (1,4)
union
    select a.id, a.parent_id, a.modified_date as updatedDate
    from organization.organization a
    where parent_id is not null
) y on y.id = x.id
left join (
select a.id, a.name, a.modified_date as updatedDate
from organization.organization a
inner join (
    select distinct parent_id
    from organization.organization
    where parent_id is not null
) as ab on a.id = ab.parent_id
where type_id not in (10,21) and prod_status_id in (1,4)
) z on z.id = y.parent_id`,
};

module.exports = {
  getRowsCountFromTable: (tableOrQuery) =>
    `SELECT count(*) from (${tableOrQuery}) db`,
  commonQuery,
};
