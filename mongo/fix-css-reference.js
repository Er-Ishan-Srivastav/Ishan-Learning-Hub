const fs = require('fs');
const path = require('path');

// List of all HTML files that need fixing
const files = [
    'project-bookstore.html',
    'mongodb-go.html',
    'mongodb-nodejs.html',
    'project-student-management.html',
    'mongodb-java.html',
    'transactions.html',
    'backup-restore.html',
    'why-distributed-databases.html',
    'mongodb-distributed.html',
    'mysql-vs-mongodb-distributed.html',
    'when-to-use-mongodb.html',
    'cheatsheet-commands.html',
    'database-comparisons.html',
    'when-not-to-use-mongodb.html',
    'security.html',
    'sharding.html',
    'observability.html',
    'aggregation-framework.html',
    'performance-optimization.html',
    'replication.html',
    'schema-governance.html',
    'schema-design.html',
    'indexing.html',
    'embedded-arrays.html',
    'practical-example.html',
    'install-windows.html',
    'sorting-pagination.html',
    'crud-operations.html',
    'documents-bson.html',
    'databases-collections.html',
    'query-operators.html',
    'local-cloud-connection.html',
    'setup-atlas.html',
    'install-compass.html',
    'install-linux.html',
    'install-mac.html',
    'install-mongosh.html',
    'replica-set-components.html',
    'read-write-path.html',
    'wiredtiger.html',
    'document-model.html',
    'landing-mongo.html',
    'base-vs-acid.html',
    'cap-theorem.html',
    'distributed-systems.html',
    'nosql-types.html',
    'database-evolution.html',
    'why-mongodb.html',
    'learning-roadmap.html',
    'problems-mongodb-solves.html',
    'home.html',
    'shard-check.html',
    'structure.html'
];

let fixedCount = 0;

files.forEach(filename => {
    const filePath = path.join(__dirname, filename);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace content-styles.css with content-style.css
        if (content.includes('content-styles.css')) {
            content = content.replace(/content-styles\.css/g, 'content-style.css');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Fixed: ${filename}`);
            fixedCount++;
        }
    } else {
        console.log(`✗ Not found: ${filename}`);
    }
});

console.log(`\n✓ Total files fixed: ${fixedCount}`);
