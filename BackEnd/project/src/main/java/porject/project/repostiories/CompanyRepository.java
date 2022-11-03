package porject.project.repostiories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import porject.project.entities.Company;


@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {


   Company findByName( String name );

   Company findByEmail( String email );
}
